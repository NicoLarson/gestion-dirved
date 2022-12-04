const express = require('express');
const recordRoutes = express.Router();
const dbo = require('../db/conn');


/*
* READ
*/
recordRoutes.route('/conventions').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('conventions')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route('/paiements').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('paiements')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

/*
* READ BY ID
*/
recordRoutes.get('/conventions/:id', (req, res, next) => {
  let db_connect = dbo.getDb();
  if (db_connect) {
    db_connect.collection("conventions").findOne({ num_operation: req.params.id }, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
})

recordRoutes.route('/paiements/:id').get(async function (_req, res) {
  let db_connect = dbo.getDb();
  if (db_connect) {
    db_connect.collection("paiements").findOne({ num_operation: req.params.id }, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
});

// TODO : Add a route to add new convention
// TODO : Add a route to add new paiement

// This section will help you create a new record.
recordRoutes.route('/listings/recordSwipe').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    listing_id: req.body.id,
    last_modified: new Date(),
    session_id: req.body.session_id,
    direction: req.body.direction,
  };

  dbConnect
    .collection('matches')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// This section will help you update a record by id.
recordRoutes.route('/listings/updateLike').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const listingQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1,
    },
  };

  dbConnect
    .collection('listingsAndReviews')
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log('1 document updated');
      }
    });
});

// This section will help you delete a record.
recordRoutes.route('/listings/delete/:id').delete((req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = { listing_id: req.body.id };

  dbConnect
    .collection('listingsAndReviews')
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        console.log('1 document deleted');
      }
    });
});

module.exports = recordRoutes;