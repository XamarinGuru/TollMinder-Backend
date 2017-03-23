const router = require('express').Router();

router.use((req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(403).json({err: 'Not found auth header'});
  } else {
    next();
  }
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

router.post('/charge', (req, res) => {
  const Models = req.app.locals.settings.models;
  let {userId, paymentProfileId, amount} = req.body;

  if (!userId || !paymentProfileId || !amount) return res.status(400).json({ err: 'One of the parameters is missing'});

  Models.User.read(userId, req.headers['authorization']).then(user => {
    return Models.PaymentSystem.chargeCustomerProfile(user.customerProfileId, paymentProfileId, amount);
  }).then(response => {
    return Models.PaymentSystem.createTransaction(Models.Transaction.Transaction, response, userId);
  }).then(result => {
    res.status(200).json({ message: 'Transaction successfully passed'});
  }).catch(error => {
    res.status(error.code || 500).json({ err: error.message });
  })
});


module.exports = router;