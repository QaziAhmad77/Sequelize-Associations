const { Sequelize, DataTypes } = require('sequelize');
const employee = require('./employee');

const sequelize = new Sequelize("ahmad","root","",{
    host: "localhost",
    // logging: false, This will remove all the queries from the terminal when we are running .
    logging: false,
    dialect: "mysql"
});

try{
    sequelize.authenticate();
    console.log("Connected to database successfully");
}catch(error){
    console.log("Failed to connect to database",error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require('./contact')(sequelize,DataTypes);
db.employee = require('./employee')(sequelize,DataTypes);

// db.employee.hasOne(db.contact,{foreignKey: 'user_id', as: 'contactDetails'});  // if we write "userId" in models instead of user_id then no 
db.employee.hasMany(db.contact);  
db.contact.belongsTo(db.employee); // if we write// need of foreignKey

db.sequelize.sync({ force: false});
module.exports = db;