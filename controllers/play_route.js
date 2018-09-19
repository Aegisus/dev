var express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);
var shortid = require('shortid');
// var session = require('express-session')
// var cookieParser = require('cookie-parser')

const mysql = require('mysql');
//hcidb init
const hcidb = mysql.createConnection({
    host: "localhost",
    user: "hopcircl_dev",
    password: "ParaGlucloPSYK38",
    database: "hopcircl_main"
});


app.set('trust proxy', 1) // trust first proxy
    // app.use(cookieParser());
    // app.use(session({
    //     secret: '#$^@#$TGESDG%WEY&WE$^aegho%$*)(',
    //     resave: false,
    //     saveUninitialized: false,
    //     // name: 'sessionId'
    // }));

module.exports = (function() {
    'use strict';
    var play = express.Router();
    
    var LocalStrategy = require('passport-local').Strategy;
    var bodyParser = require('body-parser');
    play.use(express.json());
    play.use(bodyParser.json());
    play.use(bodyParser.urlencoded({ extended: false }));
    play.use(expressValidator());
    play.use(cookieParser());
    var options = {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "ParaGlucloPSYK38",
        database: "hcidb"
      }; 
      
  
    var sessionStore = new MySQLStore(options);
  
    play.use(session({
      secret: '#$^@#$TGESDG%WEY&WE$^aegho%$*)(',
      resave: false,
      saveUninitialized: false,
      store: sessionStore
      // name: 'sessionId'
    }));
  
    play.use(passport.initialize());
    play.use(passport.session());
    
    play.get('/play',(req,res) => {
        let sql = 'SELECT * FROM  playposts';
        var playcard = [];
        var i = 0;
        hcidb.query(sql, (err,result)=>{
            if (err) throw err;
            if (!err) {
            result.forEach((data) => {
                if (result[i].title != null && result[i].company != null &&result[i].des != null){
                playcard.push(data);
                }
                i++;
            });
            //console.log(playcard);
            res.send({playcard: playcard});
            }
        });
    });

    play.get('/userdetails',(req,res) => {
        var getsession = req.session.name;
        var user = [];
        if (getsession != undefined){
            var fields = getsession.split(',');
            var username = fields[1];
            user.push(username);
            res.send({user: user});
        }
    });

    play.post('/play', (req,res) =>{
        // console.log('body: ' + JSON.stringify(req.body));
        // res.send(req.body);
        var getsession = req.session.name;
        var username;
        var name;

        if (getsession != undefined){
            var fields = getsession.split(',');
            var username = fields[1];
        }

        // console.log('here: ' + username);
        let sql =  `SELECT compname FROM compacc WHERE username = '${username}'`;
        accdb.query(sql, (err,result)=>{
            if (err) throw err;
            if (!err){
                name = result[0].compname;
                var playcard = {
                    uid: shortid.generate(),
                    title: req.body.title,
                    company: name,
                    des: req.body.des,
                    deliverables: req.body.del,
                    timestamp: req.body.timestamp,
                    price: req.body.price,
                    username: req.body.username
                };
                // console.log(playcard);
                let sqlcheck = 'SELECT * FROM  playposts';
                hcidb.query(sqlcheck, (err,result)=>{
                    if (err) throw err;
                    if(!err){
                        let sql = 'INSERT INTO playposts SET ?';
                        hcidb.query(sql,playcard, (err,result)=>{
                            if (err) throw err;
                        });
                    }
                });
            }
        });
      });

    var playid = null;
    play.get('/:uid/playpost', (req,res) =>{
    playid = req.params.uid;
    // console.log(playid);
    res.render('playpost');
    });
    
    play.get('/playpost', (req, res)=>{
        let sql =  `SELECT * FROM playposts WHERE (uid = '${playid}')`;
        var playdetails = [];
        hcidb.query(sql, (err,result)=>{
        if (err) throw err;
        if (!err) {
            // console.log(result);
            result.forEach((data) => {
                playdetails.push(data);
            });
            // console.log(playdetails);
        res.send({playdetails: playdetails});
        }
        });
        playid = null;
    });
    return play;
})();