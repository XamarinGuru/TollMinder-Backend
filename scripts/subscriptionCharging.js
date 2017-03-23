const MongoClient = require('mongodb').MongoClient,
    conf = require('../src/conf'),
    async = require('async');
let PaymentSystem = require('../src/Classes/PaymentSystem');
PaymentSystem = new PaymentSystem();
let users = [],
    trips = [];
MongoClient.connect(conf.mongoURI, (err, db) => {
  const query = {
    subscription: { $elemMatch: { enabled: true, unit: 'month', interval: '1'}}
  };
  const projection = { customerProfileId: 1, subscription: 1};
  let trips = [];
  db.collection('users').find(query, projection).toArray((err, results) => {
    if (err) {
      console.error(err);
      db.close();
    }
    users = results;
    async.map(users, (user, callback1) => {
      //Get all trips for each user
      db.collection('trips').find({ _user: user, status: 'notPayed'}).toArray((err, results) => {
        if (err) {
          console.error(err);
          callback1(err);
        }
        trips.push(results);
        let sum = 0;
        //Get the sum of costs for all trips for each user
        async.map(results, (trip, callback2) => {
          db.collection('rates').findOne({ _id: trip._rate }, (err, rate) => {
            if (err) {
              console.error(err);
              callback2(err);
            }
            callback2(null, rate.cost);
          })
        }, (err, costs) => {
          sum = costs.reduce((prev, curr) => prev + curr);
          callback1(null, sum);
        });
      }, (err, sumArray) => {
        //TODO: charge each customer profile for each sum
        if (err) {
          console.error(err);
          db.close();
        }


      });
    });

  })
});
