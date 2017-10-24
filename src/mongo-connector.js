const {MongoClient} = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017/steamstoredb';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);

  return {
    SteamApps: db.collection('steamapps')
  };
}