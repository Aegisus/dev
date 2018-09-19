var express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);

//sql init
const mysql = require('mysql');
 
//hcidb init
const hcidb = mysql.createConnection({
    host: "localhost",
    user: "hopcircl_dev",
    password: "ParaGlucloPSYK38",
    database: "hopcircl_main"
});

app.set('trust proxy', 1) // trust first proxy

module.exports = (function() {
    'use strict';
    var loop = express.Router();
    
    var LocalStrategy = require('passport-local').Strategy;
    var bodyParser = require('body-parser');
    loop.use(express.json());
    loop.use(bodyParser.json());
    loop.use(bodyParser.urlencoded({ extended: false }))
    loop.use(expressValidator());
    loop.use(cookieParser());
    var options = {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "ParaGlucloPSYK38",
        database: "hcidb"
      }; 
      
  
    var sessionStore = new MySQLStore(options);
  
    loop.use(session({
      secret: '#$^@#$TGESDG%WEY&WE$^aegho%$*)(',
      resave: false,
      saveUninitialized: false,
      store: sessionStore
      // name: 'sessionId'
    }));
  
    loop.use(passport.initialize());
    loop.use(passport.session());
    
    loop.get('/loop', (req,res) =>{
        // console.log('body: ' + JSON.stringify(req.body));
        let sql = 'SELECT * FROM loopposts';
        var loopcard = [];
        var i = 0;
        hcidb.query(sql, (err,result)=>{
        if (err) throw err;
            if (!err) {
                result.forEach((data) => {
                        if (result[i].title != null){
                            loopcard.push(data);
                    }
                    i++;
                });
            //console.log(playcard);
            res.send({loopcard: loopcard});
            }
        });
    });

    var loopid = null;
    loop.get('/:id/looppost', (req,res) =>{
        loopid = req.params.id;
        // console.log(playid);
        res.render('looppost');
    });
    
    loop.get('/looppost', (req, res)=>{
        let sql =  `SELECT * FROM loopposts WHERE (id = '${loopid}')`;
        var loopdetails = [];
        hcidb.query(sql, (err,result)=>{
        if (err) throw err;
        if (!err) {
            // console.log(result);
            result.forEach((data) => {
                loopdetails.push(data);
            });
            // console.log(loopdetails);
        res.send({loopdetails: loopdetails});
        }
        });
        loopid = null;
    });
    return loop;
})();