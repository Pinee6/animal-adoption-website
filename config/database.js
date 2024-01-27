const{Sequelize}  = require('sequelize');

var sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: '1234',
  database: 'web_adoption',
  host: 'localhost'
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = sequelize;
