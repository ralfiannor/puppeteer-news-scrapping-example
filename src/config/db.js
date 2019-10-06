const config = require("config");
const db = require('mongoose');

const server = config.get('mongodb.host');
const port = config.get('mongodb.port');
const database = config.get('mongodb.db');
const user = config.get('mongodb.user');
const password = config.get('mongodb.pass');

const option = {
  useNewUrlParser: true,
  useCreateIndex: true
};

// connect to mongoDB server
let connectionString = `mongodb://${user}:${password}@${server}:${port}/${database}`;
if (config.get('env') == 'production') {
  connectionString = `mongodb+srv://${user}:${password}@${server}/${database}`;
}
db.connect(connectionString, option);
module.exports = { db };