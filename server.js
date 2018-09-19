var express = require('express');
const app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var shortid = require('shortid');
var bcrypt = require('bcrypt')

// var controllers = require('./controllers');
// controllers.set(app);

// var acc = require('./controllers/acc_route.js');

var acc = require('./controllers/acc_route.js')
var loop = require('./controllers/loop_route.js')
var play = require('./controllers/play_route.js')

//sql init
const mysql = require('mysql');
//playdb init
const hcidb = mysql.createConnection({
    host: "localhost",
    user: "hopcircl_dev",
    password: "ParaGlucloPSYK38",
    database: "hopcircl_main"
});

// const hcidb = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "ParaGlucloPSYK38",
//     database: "hcidb"
//   });

// console.log(sessionStore)
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/', acc);
app.use('/', loop);
app.use('/', play);
app.set('trust proxy', 1) // trust first proxy
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/assets'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ParaGlucloPSYK38',
    database: 'hcidb'
};

var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'qwiuehro12412879r!@$@!',
    secret: 'asdhg@#$@!%asfas!@$',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(
    function (username, password, done) {
        // var i = 0;
        // console.log(username);
        // console.log(password);
        let sqlcheck = 'SELECT username, password FROM studacc WHERE username = ?';
        hcidb.query(sqlcheck, [username], (err, result) => {
            if (err) { done(err) };
            if (result.length === 0) {
                done(null, false);
            }
            else {
                // console.log(result[0].password.toString());
                const hash = result[0].password.toString();
                bcrypt.compare(password, hash, (err, res) => {
                    if (res === true) {
                        return done(null, { user: 'student,' + result[0].username });
                    }
                    else {
                        return done(null, false);
                    }
                });
            }
        });
    }));

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        // console.log(req.user.user);
        // console.log(req.isAuthenticated());
        // console.log(typeof req.user);
        //if login
        if (typeof req.user === 'object'){
            req.session.name = req.user.user;
            // console.log("1: " + req.session.name);
        }
            
        //if register
        if (!req.user.user){
            req.session.name = req.user;
            // console.log("2: " + req.session.name);
        }
        // console.log('session:' + req.session.name);
        res.render('index');
    }
    else {
        res.redirect('/home');
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send('logout');
});

app.get('/indextype', (req, res) => {
    var getsession = req.session.name;
    var name;
    // console.log(getsession);
    if (getsession != null) {
        var fields = getsession.split(',');
        // console.log(fields[1]);
        let sqlcheck = 'SELECT name FROM studacc WHERE username = ?';
        hcidb.query(sqlcheck, [fields[1]], (err, result) => {
            var indextype = {
                account: fields[0],
                username: fields[1],
                name: result[0].name
            };
            res.send({ indextype: indextype });
        });
    }
    else {
        res.send({ indextype: null });
    }
});


// app.get("/uid", (req, res) => {
//     res.send(shortid.generate());
// });

var urlendpoints = ['playground', 'create', 'index', 'hoppers', 'editaccount'];
urlendpoints.forEach((route) => {
    app.get('/' + route, (req, res) => {
        if (req.isAuthenticated()) {
            res.render(route);
        }
        else{
            res.redirect('/home');
        }
    });
});

app.get('/home', (req,res) =>{
    res.render('home');
});

app.get('/termsofuse', (req,res) =>{
    res.render('tnc');
});

app.get("/myprojects/inbox", (req, res)=> {
    if (req.isAuthenticated()) {
        res.render('inbox');
    }
    else{
        res.redirect('/home');
    }
});

app.get("/myprojects/projects", (req, res)=> {
    if (req.isAuthenticated()) {
        res.render('current');
    }
    else{
        res.redirect('/home');
    }
});

function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/home')
    }
}

var PORT = process.env.PORT || 3000
app.listen(PORT, function () {
    console.log('Listening on port ' + PORT);
});