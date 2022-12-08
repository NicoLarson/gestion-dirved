const { MongoClient } = require("mongodb");
const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/DiRVED"

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      if (err || !db) {
        return callback(err);
      }
      dbConnection = db.db(process.env.MONGODB_DB);
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: () => {
    return dbConnection;
  },
};
