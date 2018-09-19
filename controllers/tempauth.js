var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

module.exports.set = function(app) {
    app.set('trust proxy', 1) // trust first proxy
    var bodyParser = require('body-parser');
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser());
    app.use(session({
        secret: '#$^@#$TGESDG%WEY&WE$^aegho%$*)(',
        resave: false,
        saveUninitialized: false,
        // name: 'sessionId'
    }));
    
    // app.get('/:acc/:user', function (req, res) {
    //     req.session.name = req.params.acc + ',' + req.params.user;
    //     res.redirect('/');
    // });

    // app.get("/user/:user", (req, res)=> {
    //     req.session.name = req.params.user;
    //     res.redirect('/');
    // });
    
    app.get("/usercheck", (req, res)=> {
        console.log(req.session.name);
        res.send('Hello '+ req.session.name+ '! Click <a href="/logout">Here</a> to logout');
    });
    
    

}