const express = require('express');
const db = require('./models');
const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

// Instance Routes Back
const routes = require('./routes');
app.use(routes);
db.sequelize.sync();

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
};
