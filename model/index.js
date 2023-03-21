const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URL;   // set mongodb url as enviroment variable or replace it here
db.buff = require('./buff.model.js')(mongoose);
db.item = require('./item.model.js')(mongoose);

module.exports = db;