var Sequelize = require('sequelize');
var pg = require('pg');

pg.defaults.ssl = true;

// var sequelize = new Sequelize('bitecrunch', 'bc_user', 'bc_user_pw', {
//     host: '172.27.71.8',
//     port: '5432',
//     dialect: 'postgres',
//     pool: {
//         max: 10,
//         min: 0,
//         acquire: 30000,idle: 10000
//     }
// })

var sequelize = new Sequelize('df7ajecpsrhob5', 'hpkttsbqpvcdhv', 'dda742e77cbd0f7e3bc88863503fe5eea5173e2f95e8dbfb4b2a57752a8ca8dd', {
    host: 'ec2-54-235-169-191.compute-1.amazonaws.com',
    port: '5432',
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,idle: 10000
    }
})

//var sequelize = new Sequelize('postgres://postgres@172.27.71.8:5432/book-crunch')
//var sequelize = new Sequelize('    postgres://hpkttsbqpvcdhv:dda742e77cbd0f7e3bc88863503fe5eea5173e2f95e8dbfb4b2a57752a8ca8dd@ec2-54-235-169-191.compute-1.amazonaws.com:5432/df7ajecpsrhob5');
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

module.exports = User;