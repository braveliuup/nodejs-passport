var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./routes/index');
var users = require('./routes/users');
var user = require('./routes/user');
var session = require('express-session');

var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'braveliu', cookie: {maxAge: 24*60*60*1000}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



/// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

passport.use('local', new LocalStrategy(
    function (username, password, done) {
        var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        }; 

        if(username !== user.username) {
            return done(null, false, {message: 'Incorrect username'});
        }
        if( password !== user.password ) {
            return done(null, false, { messag: 'Incorrect password'});
        }

        return done(null, user);
    }
));

passport.serializeUser( function (user, done) { 
    done(null, user);
});

passport.deserializeUser( function (user, done) {
    done(null, user);
});

app.get('/', routes);
app.all('/users', isLoggedIn);
app.post('/login', passport.authenticate('local', {
    successRedirect: '/users', 
    failureRedirect: '/'
}));
app.get('/users', user.list);
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() ){
        return next();
    }
    res.redirect('/');
}
// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

http.createServer(app).listen(2300, function() {
    console.log('servet started  listening on port' + 2300);
})
module.exports = app;
