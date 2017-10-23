const {MongoClient} = require('mongodb');
const request = require('request-promise-native');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptUser(msg) {
  return new Promise((resolve) => {
      rl.question(msg, (answer)=> {
        const result = (answer === 'yes' || answer === 'y') ? true : false;
        rl.close();
        return resolve(result);
      });
    });
}

function progressLine(msg) {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(msg);
}

const MONGO_URL = 'mongodb://localhost:27017/steamstoredb';

const initDB = async () => {

  const accept = await promptUser('WARNING! You are going to initalize your DB. This command will erase old data from your "steamstoredb" collection. Are you sure?');
  if (!accept) throw new Error('Cancelled by user.');
  const db = await MongoClient.connect(MONGO_URL);
  SteamApps = db.collection('steamapps');

  console.log('Removing old data');

  SteamApps.deleteMany({});

  console.log('Fetching apps list');

  let resp = await request('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
  let applist = JSON.parse(resp).applist.apps;

  console.log('Saving to DB');

  const response = await SteamApps.insertMany(applist);

  console.log(response);

  db.close();
}

initDB();