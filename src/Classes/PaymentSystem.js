'use strict';
const conf = require('./../conf').payment,
  ApiContracts = require('authorizenet').APIContracts,
  ApiControllers = require('authorizenet').APIControllers,
  Joi = require('joi');

class PaymentSystem {
  constructor() {
    this.merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    this.merchantAuthenticationType.setName(conf.apiLoginID);
    this.merchantAuthenticationType.setTransactionKey(conf.transactionKey);
  }

  /**
   * Charge credit card
   * @param {number} amount - the price that need to be paid
   * @return {Promise}
   */
  chargeCreditCard(amount) {
    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(this.creditCard);

    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(amount);

    const createRequest = new ApiContracts.CreateTransactionRequest({
      transactionRequest: transactionRequestType,
      merchantAuthentication: this.merchantAuthenticationType
    });
    
    let transactionController = new ApiControllers.CreateTransactionController(createRequest);
    transactionController.execute(function () {
      return new Promise((resolve, reject) => {
        const apiResponse = transactionController.getResponse();
        const response = new ApiContracts.CreateTransactionResponse(apiResponse);
        if (response !== null) {
          resolve(response);
        } else {
          reject(new Error('Null response'));
        }
      });
    })
  }

  /**
   * Create transaction if there are no errors, otherwise transaction is not created and return error object
   * @param {Mongoose.Model} Transaction - model
   * @param {TransactionResponse} response - transaction response
   * @param {string} userId - user id
   * @returns {Promise|Promise.<*>} Resolve {Mongoose.Object} transaction
   */
  createTransaction(Transaction, response, userId) {
    if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
      let transaction = new Transaction();
      transaction.transactionId = response.getTransactionResponse().getTransId();
      transaction._user = userId;
      //Check enum values
      transaction.status = Transaction.schema.path('status').enumValues[response.getTransactionResponse().getResponseCode() - 1];
      return transaction.save();
    } else {
      return Promise.reject({
        error: response.getTransactionResponse().getErrors().error[0]
      });
    }
  }

  /**
   * Create Customer Profile for subscription on recurring billing
   * @param {User} user - user object
   * @returns {Promise}
   */
  createCustomerProfile(user) {
    return new Promise((resolve, reject) => {
      const paymentType = new ApiContracts.PaymentType({ creditCard: this.creditCard });

      validateProfileFields(user);
      const customerAddress = new ApiContracts.CustomerAddressType({
        firstName: user.firstname,
        lastName: user.lastname,
        address: user.address,
        city: user.city,
        state: user.state,
        country: 'USA',
        phoneNumber: user.phone
      });

      const customerPaymentProfileType = new ApiContracts.CustomerPaymentProfileType();
      customerPaymentProfileType.setCustomerType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
      customerPaymentProfileType.setPayment(paymentType);
      customerPaymentProfileType.setBillTo(customerAddress);

      const paymentProfileList = [];
      paymentProfileList.push(customerPaymentProfileType);

      const customerProfileType = new ApiContracts.CustomerProfileType();
      customerProfileType.setMerchantCustomerId('M_' + getRandomString('cust'));
      customerProfileType.setDescription('Tollminder subscription for trips auto payment');
      customerProfileType.setEmail(user.email);
      customerProfileType.setPaymentProfiles(paymentProfileList);


      const createRequest = new ApiContracts.CreateCustomerProfileRequest();
      createRequest.setProfile(customerProfileType);
      // Now validation mode is in TEST_MODE, need to change than to Live
      createRequest.setValidationMode(ApiContracts.ValidationModeEnum.TESTMODE);
      createRequest.setMerchantAuthentication(this.merchantAuthenticationType);

      const customerProfileController = new ApiControllers.CreateCustomerProfileController(createRequest.getJSON());
      customerProfileController.execute(() => {
        const apiResponse = customerProfileController.getResponse();
        const response = new ApiContracts.CreateCustomerProfileResponse(apiResponse);
        console.log(JSON.stringify(response, null, 2));

        if (response !== null) {
          if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
            let cardNum = this.creditCard.getCardNumber();
            resolve({
              customerProfileId: response.getCustomerProfileId(),
              customerPaymentProfileIdList: response.getCustomerPaymentProfileIdList().numericString,
              cardNum: cardNum.slice(cardNum.length - 4, cardNum.length)
            });
          } else {
            reject({ error: response.getMessages().getMessage()[0].getCode() });
          }
        } else {
          reject(new Error('Null response'));
        }
      })
    });
  }

  /**
   *  Create new payment profile to existing customer profile
   * @param {User} user
   * @returns {Promise}
   */
  createPaymentProfile(user) {
    return new Promise((resolve, reject) => {
      const paymentType = new ApiContracts.PaymentType({
        creditCard: this.creditCard
      });
      const customerAddress = new ApiContracts.CustomerAddressType({
        firstName: user.firstname,
        lastName: user.lastname,
        address: user.address,
        city: user.city,
        state: user.state,
        country: 'USA',
        phoneNumber: user.phone
      });

      const profile = new ApiContracts.CustomerPaymentProfileType();
      profile.setBillTo(customerAddress);
      profile.setPayment(paymentType);

      // Now validation mode is in TEST_MODE, need to change than to Live
      const createRequest = new ApiContracts.CreateCustomerPaymentProfileRequest();
      createRequest.setPaymentProfile(profile);
      createRequest.setCustomerProfileId(user.customerProfileId);
      createRequest.setValidationMode(ApiContracts.ValidationModeEnum.TESTMODE);
      createRequest.setMerchantAuthentication(this.merchantAuthenticationType);

      const customerController = new ApiControllers.CreateCustomerPaymentProfileController(createRequest.getJSON());
      customerController.execute(() => {
        const apiResponse = customerController.getResponse();
        const response = new ApiContracts.CreateCustomerPaymentProfileResponse(apiResponse);

        if (response !== null) {
          if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
            let cardNum = this.creditCard.getCardNumber();
            resolve({
              customerPaymentProfileId: response.getCustomerPaymentProfileId(),
              cardNum: cardNum.slice(cardNum.length - 4, cardNum.length)
            });
          } else {
            reject({ error: response.getMessages().getMessage()[0].getText() });
          }
        } else {
          reject(new Error('Null response'));
        }
      })
    })
  }

  /**
   * Delete customer payment profile from Authorize.Net
   * @param {string} customerProfileId
   * @param {string} customerPaymentProfileId
   * @returns {Promise}
   */
  deleteCustomerPaymentProfile(customerProfileId, customerPaymentProfileId) {
    return new Promise((resolve, reject) => {
        const deleteRequest = new ApiContracts.DeleteCustomerPaymentProfileRequest();
        deleteRequest.setCustomerProfileId(customerProfileId);
        deleteRequest.setCustomerPaymentProfileId(customerPaymentProfileId);
        deleteRequest.setMerchantAuthentication(this.merchantAuthenticationType);

        const deleteController = new ApiControllers.DeleteCustomerPaymentProfileController(deleteRequest.getJSON());
        deleteController.execute(() => {
          const apiResponse = deleteController.getResponse();
          const response = new ApiContracts.DeleteCustomerPaymentProfileResponse(apiResponse);

          if (response !== null) {
            if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
              resolve({});
            } else {
              reject({ error: response.getMessages().getMessage()[0].getText() });
            }
          } else {
            reject(new Error('Null response'));
          }
        })
    });
  }

  /**
   * Create charge request for existing customer
   * @param {string} customerProfileId
   * @param {string} customerPaymentProfileId
   * @param {number} amount
   * @returns {Promise}
   */
  chargeCustomerProfile(customerProfileId, customerPaymentProfileId, amount) {
    return new Promise((resolve, reject) => {
      const profileToCharge = new ApiContracts.CustomerProfilePaymentType({
        customerProfileId: customerProfileId
      });
      const paymentProfile = new ApiContracts.PaymentProfile({
        paymentProfileId: customerPaymentProfileId
      });
      profileToCharge.setPaymentProfile(paymentProfile);

      const transactionRequestType = new ApiContracts.TransactionRequestType();
      transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
      transactionRequestType.setProfile(profileToCharge);
      transactionRequestType.setAmount(amount);

      const createRequest = new ApiContracts.CreateTransactionRequest();
      createRequest.setTransactionRequest(transactionRequestType);
      createRequest.setMerchantAuthentication(this.merchantAuthenticationType);

      let transactionController = new ApiControllers.CreateTransactionController(createRequest.getJSON());
      transactionController.execute(function () {
        const apiResponse = transactionController.getResponse();
        const response = new ApiContracts.CreateTransactionResponse(apiResponse);
        if (response !== null) {
          resolve(response);
        } else {
          reject(new Error('Null response'));
        }
      })
    });
  }

  /**
   * Creates subscription on Authorize.Net service
   * @param {string} customerProfileId
   * @param {string} customerPaymentProfileId
   * @param {string} customerAddressId
   * @param {object} intervalData - contains two props - {length}, {unit}
   * @returns {Promise}
   */
  createSubscriptionAuthorizeNet(customerProfileId, customerPaymentProfileId, customerAddressId, intervalData) {
    return new Promise((resolve, reject) => {
      const interval = new ApiContracts.PaymentScheduleType.Interval();
      if (intervalData) {
        interval.setLength(intervalData.length);
        interval.setUnit(intervalData.unit);
      } else {
        interval.setLength(1);
        interval.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);
      }

      const paymentScheduleType = new ApiContracts.PaymentScheduleType();
      paymentScheduleType.setInterval(interval);
      paymentScheduleType.setStartDate(getDate());
      paymentScheduleType.setTotalOccurrences(9999);

      const customerProfileIdType = new ApiContracts.CustomerProfileIdType();
      customerProfileIdType.setCustomerProfileId(customerProfileId);
      customerProfileIdType.setCustomerPaymentProfileId(customerPaymentProfileId);
      customerProfileIdType.setCustomerAddressId(customerAddressId);

      const arbSubscription = new ApiContracts.ARBSubscriptionType();
      arbSubscription.setName('trips payment');
      arbSubscription.setPaymentSchedule(paymentScheduleType);
      arbSubscription.setProfile(customerProfileIdType);
      arbSubscription.setAmount(100);

      const createRequest = new ApiContracts.ARBCreateSubscriptionRequest();
      createRequest.setSubscription(arbSubscription);
      createRequest.setMerchantAuthentication(this.merchantAuthenticationType);

      const subscriptionController = new ApiControllers.ARBCreateSubscriptionController(createRequest.getJSON());
      subscriptionController.execute(() => {
        const apiResponse = subscriptionController.getResponse();
        const response = new ApiContracts.ARBCreateSubscriptionResponse(apiResponse);
        console.log(JSON.stringify(response, null, 2));

        if (response !== null) {
          if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
            resolve(response);
          } else {
            reject({ message: response.getMessages().getMessage()[0].getCode() });
          }
        } else {
          reject(new Error('Null response'));
        }
      });
    });
  }

  /**
   * Get customer Profile
   * @param {string} customerProfileId
   * @returns {Promise}
   */
  getCustomerProfile(customerProfileId) {
    return new Promise((resolve, reject) => {
      const getRequest = new ApiContracts.GetCustomerProfileRequest();
      getRequest.setMerchantAuthentication(this.merchantAuthenticationType);
      getRequest.setCustomerProfileId(customerProfileId);

      const customerController = new ApiControllers.GetCustomerProfileController(getRequest.getJSON());
      customerController.execute(() => {
        const apiResponse = customerController.getResponse();
        const response = new ApiContracts.GetCustomerProfileResponse(apiResponse);
        console.log(JSON.stringify(response, null, 2));

        if (response !== null) {
          if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
            resolve(response);
          } else {
            reject({ message: response.getMessages().getMessage()[0].getCode() });
          }
        } else {
          reject(new Error('Null response'));
        }
      })
    });
  }

  /**
   * Cancel subscription on Authorize.Net service
   * @param {string} subscriptionId
   * @returns {Promise}
   */
  cancelSubscriptionAuthorizeNet(subscriptionId) {
    return new Promise((resolve, reject) => {
      const cancelRequest = new ApiContracts.ARBCancelSubscriptionRequest();
      cancelRequest.setMerchantAuthentication(this.merchantAuthenticationType);
      cancelRequest.setSubscriptionId(subscriptionId);

      const cancelSubscriptionController = new ApiControllers.ARBCancelSubscriptionController(cancelRequest.getJSON());
      cancelSubscriptionController.execute(() => {
        const apiResponse = cancelSubscriptionController.getResponse();
        const response = new ApiContracts.ARBCancelSubscriptionResponse(apiResponse);
        console.log(JSON.stringify(response, null, 2));

        if (response !== null) {
          if (response.getMessages().getResultCode() === ApiContracts.MessageTypeEnum.OK) {
            resolve(response);
          } else {
            reject({ message: response.getMessages().getMessage()[0].getCode() });
          }
        } else {
          reject(new Error('Null response'));
        }
      });
    })
  }



  /**
   * Validate payment data
   * @param data - payment data object which corresponds to paymentData schema
   * @returns {Object} - two props {error} and {value}
   */
  validatePaymentData(data) {
    let {error, value} = Joi.validate(data, paymentDataSchema);
    if (error) return { error: { message: error.details[0].message} };
    // Validate month and year not to be in the past
    if ((+value.expirationMonth < (new Date()).getMonth() + 1 ) ||
        (+value.expirationYear < new Date().getFullYear().toString().slice(2,4))) {
      return { error: { message: 'Expiration date must be in future'} };
    }
    return { error: null, value};
  }

  /**
   * Create credit card type object
   * @param data - payment data object which corresponds to paymentData schema
   */
  setCreditCardSync(data) {
    let {error, value} = this.validatePaymentData(data);
    if (error) throw error;
    value.expirationDate = `${value.expirationMonth}${value.expirationYear}`;
    this.creditCard = new ApiContracts.CreditCardType();
    this.creditCard.setCardCode(value.cardCode);
    this.creditCard.setCardNumber(value.creditCardNumber);
    this.creditCard.setExpirationDate(value.expirationDate);
  }
}

// Schema for payment data
const paymentDataSchema = Joi.object().keys({
  creditCardNumber: Joi.string().creditCard().required().min(13).max(16),
  expirationMonth: Joi.string().regex(/^[0-9]+$/, 'numbers').length(2).required(),
  expirationYear: Joi.string().regex(/^[0-9]+$/, 'numbers').min(2).max(4).required(),
  cardCode: Joi.string().min(3).max(4).required()
});

// Utils
function getRandomString(text){
  return text + Math.floor((Math.random() * 100000) + 1);
}

function getDate(){
  return (new Date()).toISOString().substring(0, 10) ;
}

function validateProfileFields({ firstname, lastname, address, city, state, phone, email}) {
  if (firstname && lastname && address && city && state && phone && email) {
   return true;
  } else {
    throw { message: 'Missing some of the profile fields required for creating customer profile'};
  }
}

module.exports = PaymentSystem;