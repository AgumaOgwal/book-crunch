var Sequelize = require('sequelize');

var sequelize = new Sequelize('bitecrunch', 'bc_user', 'bc_user_pw', {
    host: '172.27.71.8',
    port: '5432',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,idle: 10000
    }
})
//var sequelize = new Sequelize('postgres://postgres@172.27.71.8:5432/book-crunch')

var User = sequelize.define('bookcrunch_users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
     
});


// Create all defined tables in the specified database.

sequelize.sync()
    .then( function(){
        console.log('bookcrunch_users table has been created')
    })