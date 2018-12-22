var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var user = require('./user');

var app = express();

app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extend: true }));

app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret: 'somerandomkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(function(req, res, next){
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

var sessionChecker = function(req, res, next) {
    if(req.session.user && req.cookies.user_sid) {
        next();
    } else {
        res.redirect('/');
    }
}

app.route('/register')
    .get(sessionChecker, function(req, res){
        res.send(__dirname + '../public/layout/register.html')
    })
    .post(function(req, res){
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then( function(user){
            req.session.user = user.dataValues;
            res.redirect('/')
        })
        .catch( function(error){
            res.redirect('/register');
        });
});

app.route('/login')
    .get(sessionChecker, function(req, res){
        res.sendFile(__dirname + '../public/layout/login.html');
    })
    .post(function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({ where: { username: username}}).then(function(user){
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/');
            }
        });
    });


app.get('/', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '../public/layouts/index.html');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.use(function(req, res, next){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
})
app.listen(app.get('port'), function() {
    console.log('Express is now running on http://localhost:'+app.get('port')+'; Press Ctrl-C to terminate');
})

