const router = require('express').Router();

router.use((req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(403).json({err: 'Not found auth header'});
  } else {
    next();
  }
});

router.get('/:userId/cards', (req, res) => {
  const Models = req.app.locals.settings.models;
  let { userId } = req.params;

  if (!userId) return res.status(400).json({ err: 'One of the parameters is missing'});

  Models.User.read(userId, req.headers['authorization']).then(user => {
    res.status(200).json(user.paymentProfiles);
  }).catch(error => {
    res.status(error.code || 500).json({ err: error.message });
  })
});

router.post('/card', (req, res) => {
  const Models = req.app.locals.settings.models;
  let {creditCardNumber, expirationMonth, expirationYear, cardCode, userId} = req.body;
  if (!creditCardNumber || !expirationMonth || !expirationYear || !cardCode || !userId) {
    return res.status(400).json({ err: 'One of the parameters is missing'});
  }
  const token = req.headers['authorization'];
  try {
    Models.PaymentSystem.setCreditCardSync({ creditCardNumber, expirationYear, expirationMonth, cardCode });
  } catch (error) {
    return res.status(400).json({ err:  error.message });
  }
  Models.User.read(userId, token).then(user => {
    if (!user.customerProfileId) return Models.PaymentSystem.createCustomerProfile(user);
    return new Promise((resolve, reject) => {
      Models.PaymentSystem.createPaymentProfile(user).then(result => {
        resolve({
          customerProfileId: user.customerProfileId,
          customerPaymentProfileId: result.customerPaymentProfileId,
          cardNum: result.cardNum
        });
      }).catch(err => reject(err));
    });
  }).then(result => {
    return Models.User.updatePaymentProfile(userId, token, result);
  }).then(user => {
    res.status(200).json(user);
  }).catch(error => {
    res.status(error.code || 500).json({ err: error.message });
  });
});

router.delete('/card', (req, res) => {
  const Models = req.app.locals.settings.models;
  let {userId, paymentProfileId} = req.body;

  if (!userId || !paymentProfileId) return res.status(400).json({ err: 'One of the parameters is missing'});

  Models.User.read(userId, req.headers['authorization']).then(user => {
    if (!user.customerProfileId) return Promise.reject({ code: 409, message: 'Customer profile does not exist'});
    return new Promise((resolve, reject) => {
      Models.PaymentSystem.deleteCustomerPaymentProfile(user.customerProfileId, paymentProfileId).then(result => {
        user.paymentProfiles = user.paymentProfiles.filter(v => v.paymentProfileId !== paymentProfileId);
        return user.save();
      }).then(res => resolve(res))
        .catch(error => reject(error));
    })
  }).then(user => {
    res.status(200).json();
  }).catch(error => {
    res.status(error.code || 500).json({ err: error.message });
  });
});

router.post('/charge', (req, res) => {
  const Models = req.app.locals.settings.models;
  let {userId, paymentProfileId, amount} = req.body;

  if (!userId || !paymentProfileId || !amount) {
    return res.status(400).json({ err: 'One of the parameters is missing'});
  }

  Models.User.read(userId, req.headers['authorization']).then(user => {
    return Models.PaymentSystem.chargeCustomerProfile(user.customerProfileId, paymentProfileId, amount);
  }).then(response => {
    return Models.PaymentSystem.createTransaction(Models.Transaction.Transaction, response, userId);
  }).then(transaction => {
    return Models.Trip.setAllPayedByUserId(userId, transaction.id,transaction.updatedAt);
  }).then(result => {
    res.status(200).json({ message: 'Transaction approved'});
  }).catch(error => {
    res.status(error.code || 500).json({ err: error.message });
  })
});


//Currently creates month subscription
router.post('/subscription/enable', (req, res) => {
  const Models = req.app.locals.settings.models;
  let { userId, paymentProfileId } = req.body;
  if (!userId) return res.status(400).json({ err: 'One of the parameters is missing'});

  Models.User.read(userId, req.headers['authorization']).then(user => {
    // Check if user have already enabled subscription
    for (let subs of user.subscriptions) {
      if (subs.enabled) {
        return res.status(409).json({ err: 'Subscription already exist. You need to disable previous one at first.'});
      }
    }

    let index = null;
    user.subscriptions.forEach((subs, i) => { if (subs.paymentProfileId === paymentProfileId) index = i});
    if (index) {
      user.subscriptions[index].enabled = true;
    } else {
      user.subscriptions.push({
        paymentProfileId: paymentProfileId,
        unit: 'month',
        interval: '1',
        enabled: true
      });
    }
    return user.save();
  }).then(result => {
    res.status(200).json({ message: 'Subscription enabled'});
  }).catch(error => {
    res.status(error.code || 500).json({err: error.message });
  });
});

router.post('/subscription/disable', (req, res) => {
  const Models = req.app.locals.settings.models;
  let { userId, paymentProfileId } = req.body;
  if (!userId) return res.status(400).json({ err: 'One of the parameters is missing'});

  Models.User.read(userId, req.headers['authorization']).then(user => {
    user.subscriptions.forEach(subs => {
      if (subs.paymentProfileId === paymentProfileId) {
        subs.enabled = false;
      }
    });
    return user.save();
  }).then(result => {
    res.status(200).json({ message: 'Subscription disabled'});
  }).catch(error => {
    res.status(err.code || 500).json({err: error.message });
  });
});

module.exports = router;