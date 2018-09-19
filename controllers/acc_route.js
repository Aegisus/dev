var express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var MySQLStore = require('express-mysql-session')(session);
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/uploads/')
  },
  filename: function (req, file, cb) {
    var newfilename =  file.originalname.replace(/\s/g, "");
    cb(null,  Date.now() + '-' +  newfilename);
  }
});
var upload = multer({ storage: storage });

const mysql = require('mysql');
//hcidb init
const hcidb = mysql.createConnection({
  host: "localhost",
  user: "hopcircl_dev",
  password: "ParaGlucloPSYK38",
  database: "hopcircl_main"
});

app.set('trust proxy', 1) // trust first proxy


module.exports = (function () {
  'use strict';
  var acc = express.Router();
  var LocalStrategy = require('passport-local').Strategy;
  var bodyParser = require('body-parser');
  acc.use(express.json());
  acc.use(bodyParser.json());
  acc.use(bodyParser.urlencoded({ extended: false }))
  acc.use(expressValidator());
  acc.use(cookieParser());

  var options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ParaGlucloPSYK38",
    database: "hcidb"
  };


  var sessionStore = new MySQLStore(options);

  acc.use(session({
    secret: '#$^@#$TGESDG%WEY&WE$^aegho%$*)(',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
    // name: 'sessionId'
  }));

  acc.use(passport.initialize());
  acc.use(passport.session());

  // passport.use(new LocalStrategy(
  //   function (username, password, done) {
  //     console.log(username);
  //     console.log(password);
  //     return done(null, 'sometext');
  //   }
  // ));
  // acc.get('/helloworld2', (req,res) =>{
  //   res.send('helloworld2');
  // });

  var errors;
  acc.post('/register', (req, res) => {
    // console.log('body1: ' + JSON.stringify(req.body));
    req.checkBody('remail', 'Email address must be between 4-100 characters long.').len(4, 100);
    req.checkBody('ruser', 'Username must be between 8-15 characters long.').len(8, 15);
    req.checkBody('rpass', 'Password must be between 8-100 characters long.').len(8, 100);
    // req.checkBody('rpass', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('rpass', 'Password must include one lowercase character, one uppercase character, a number, and must not contain any special character.').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "i");
    req.checkBody('re_pass', 'Passwords do not match, please try again.').equals(req.body.rpass);
    const details = {
      email: req.body.remail,
      user: req.body.ruser
    }
    errors = req.validationErrors();
    if (errors) {
      // console.log('error: ' + JSON.stringify(errors));
      res.render('home', { errors: errors, details: details });
    }
    else {
      const username = req.body.ruser;
      const password = req.body.rpass;
      const email = req.body.remail;
      const personname = username;

      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = 'INSERT INTO studacc (username, password, email , name) VALUES (?, ?, ? , ?)';
        hcidb.query(sql, [username, hash, email, personname], (err, result) => {
          if (err) throw err;
          const user = 'student,' + username;
          // console.log(user);
          req.login(user, (err) => {
            // req.session.name = req.user.user;
            // console.log(req.session.name);
            res.redirect('/');
          });
        });
      });
    }
  });

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  acc.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/home'
    }));

  acc.get('/hop', (req, res) => {
    let sqlcheck = 'SELECT * FROM  studacc';
    var hopcard = [];
    var i = 0;
    hcidb.query(sqlcheck, (err, result) => {
      if (err) throw err;
      if (!err) {
        result.forEach((data) => {
          if (result[i].name != null) {
            hopcard.push(data);
          }
          i++;
        });
        // console.log(hopcard);
        res.send({ hopcard: hopcard });
      }
    });
  });


  //others
  var acctype = null;
  var user = null;
  acc.get('/student/:user', (req, res) => {
    user = req.params.user;
    acctype = 'student';
    res.render('accounts');
  });

  acc.get('/company/:user', (req, res) => {
    user = req.params.user;
    acctype = 'company';
    res.render('accounts');
  });

  //owner
  acc.get('/accounts', (req, res) => {
    var getsession = req.session.name;
    if (getsession != undefined) {
      var fields = getsession.split(',');
      acctype = fields[0];
      user = fields[1];
      // console.log(user);
      res.render('accounts');
    }
    else {
      res.render('home');
    }
  });

  acc.get('/accounttype', (req, res) => {
    var accounttype = [];
    var getsession = req.session.name;
    if (getsession != undefined) {
      var fields = getsession.split(',');
      if (user == fields[1]) {
        if (acctype == 'student') {
          accounttype.push({ type: 'student', acc: 'owner' });
          res.send({ accounttype: accounttype });
        }
        if (acctype == 'company') {
          accounttype.push({ type: 'company', acc: 'owner' });
          res.send({ accounttype: accounttype });
        }
        // console.log(accounttype);
      }
      else {
        if (acctype == 'student') {
          accounttype.push({ type: 'student', acc: 'others' });
          res.send({ accounttype: accounttype });
        }
        if (acctype == 'company') {
          accounttype.push({ type: 'company', acc: 'others' });
          res.send({ accounttype: accounttype });
        }
        // console.log(accounttype);
      }
    }
  });

  acc.get('/accountdetails', (req, res) => {
    if (acctype == 'student') {
      // console.log('acc details: ' + user);
      let sql = `SELECT * FROM studacc WHERE (username = '${user}')`;
      var accdetails = [];
      hcidb.query(sql, (err, result) => {
        if (err) throw err;
        if (!err) {
          // console.log(result);
          result.forEach((data) => {
            accdetails.push(data);
          });
          // accdetails.push({type:'student'});
          // console.log(accdetails);
          res.send({ accdetails: accdetails });
        }
      });
    }
    if (acctype == 'company') {
      let sql = `SELECT * FROM compacc WHERE (username = '${user}')`;
      var accdetails = [];
      hcidb.query(sql, (err, result) => {
        if (err) throw err;
        if (!err) {
          // console.log(result);
          result.forEach((data) => {
            accdetails.push(data);
          });
          // accdetails.push({type: 'company'});
          // console.log(accdetails);
          res.send({ accdetails: accdetails });
        }
      });
    }
  });

  acc.get('/projlist', (req, res) => {
    if (acctype == 'student') {
      // console.log('this is : ' + user);
      let sql = `SELECT * FROM playposts WHERE stud = '${user}'`;
      var projectlist = [];
      var i = 0;
      hcidb.query(sql, (err, result) => {
        if (err) throw err;
        if (!err) {
          // console.log(result);
          result.forEach((data) => {
            if (result[i].title != null && result[i].company != null && result[i].des != null) {
              projectlist.push(data);
            }
            i++;
          });
          res.send({ projectlist: projectlist });
        }
      });
    }
  });

  acc.post('/editdetails', (req, res) => {
    if (acctype == 'student') {
      let updateobject = {
        skillsets: req.body.skillsets,
        softprof: req.body.softprof
      };
      // console.log('body1: ' + JSON.stringify(updateobject.skillsets));
      //let sql =  `UPDATE studacc SET title = '${newTitle}' WHERE id = ${req.params.id}`;
      let sql = `UPDATE studacc SET skillsets = '${updateobject.skillsets}', softprof = '${updateobject.softprof}' WHERE (username = '${user}')`;
      hcidb.query(sql, (err, result) => {
        if (err) throw err;
        if (!err) {
          user = null;
          acctype = null;
        }
      });
    }
    if (acctype == 'company') {
      let updateobject = {
        compdes: req.body.compdes,
        industry: req.body.industry,
        services: req.body.services
      };
      // console.log('body: ' + JSON.stringify(updateobject));
      //let sql =  `UPDATE studacc SET title = '${newTitle}' WHERE id = ${req.params.id}`;
      let sql = `UPDATE compacc SET compdes = '${updateobject.compdes}', industry = '${updateobject.industry}', services = '${updateobject.services}'  WHERE (username = '${user}')`;
      hcidb.query(sql, (err, result) => {
        if (err) throw err;
        if (!err) {
          user = null;
          acctype = null;
        }
      });
    }
  });

  acc.get('/editaccounttype', (req, res) => {
    var getsession = req.session.name;
    if (getsession != undefined) {
      var fields = getsession.split(',');
      acctype = fields[0];
      user = fields[1];
      var editaccjson = {
        accounttype: acctype,
        username: user
      };
      res.send({ editaccjson: editaccjson });
    }
  });

  function authenticationMiddleware() {
    return (req, res, next) => {
      console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

      if (req.isAuthenticated()) return next();
      res.redirect('/home')
    }
  }

  acc.post('/editacc', upload.any(), (req, res) => {
    var fields = req.session.name.split(',');
    var filepath = [];
    for (var i = 0; i < req.files.length; i++) {
      // console.log(req.files[i].path);
      filepath[i] = req.files[i].filename;
    }
    let updateobject = {
      name: req.body.fullname,
      dob: req.body.dob,
      hp: req.body.handphone,
      skillsets: req.body.skillsets,
      softprof: req.body.softprof,
      front: filepath[1],
      back: filepath[2],
      grade: filepath[3],
      photo: filepath[0],
    };
    console.log(updateobject.front);
    console.log(updateobject.back);
    console.log(updateobject.grade);
    console.log(updateobject.photo);
    // console.log('body1: ' + JSON.stringify(updateobject.skillsets));
    //let sql =  `UPDATE studacc SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let sql = `UPDATE studacc SET skillsets = '${updateobject.skillsets}', softprof = '${updateobject.softprof}' , name = '${updateobject.name}', dob = '${updateobject.dob}', hp = '${updateobject.hp}' , front = '${updateobject.front}' , back = '${updateobject.back}' , grade = '${updateobject.grade}'  , photo = '${updateobject.photo}'  WHERE (username = '${fields[1]}')`;
    hcidb.query(sql, (err, result) => {
      if (err) throw err;
    });
    res.redirect('/accounts');
  });

  // acc.get('/projdone',(req,res) => {
  //       var getsession = req.session.name;  
  //       if (getsession != undefined){
  //           var fields = getsession.split(',');
  //           var acctype = fields[0];
  //           var user = fields[1];

  //           let sql = `SELECT * FROM playposts WHERE stud = '${user}'`;
  //           var projectlist = [];
  //           var i = 0;
  //           playdb.query(sql, (err,result)=>{
  //               if (err) throw err;
  //               if (!err) {
  //               // console.log(result);
  //               result.forEach((data) => {
  //                   if (result[i].title != null && result[i].company != null &&result[i].des != null){
  //                       projectlist.push(data);
  //                   }
  //                   i++;
  //               });
  //               res.send({projectlist: projectlist});
  //               }
  //           });
  //       }
  //   });

  return acc;
})();


























// go by userid
      // else{
      //   if (acctype == 'student'){
      //   let sql =  `SELECT * FROM studacc WHERE (id = '${userid}')`;
      //     var accdetails = [];
      //     hcidb.query(sql, (err,result)=>{
      //     if (err) throw err;
      //     if (!err) {
      //       // console.log(result);
      //       result.forEach((data) => {
      //         accdetails.push(data);
      //       });
      //       console.log(accdetails);
      //       res.send({accdetails: accdetails});
      //     }
      //     });
      //     user = null;
      //   }
      //   if (acctype == 'company'){
      //     let sql =  `SELECT * FROM compacc WHERE (id = '${userid}')`;
      //     var accdetails = [];
      //     hcidb.query(sql, (err,result)=>{
      //     if (err) throw err;
      //     if (!err) {
      //       // console.log(result);
      //       result.forEach((data) => {
      //         accdetails.push(data);
      //       });
      //       console.log(accdetails);
      //       res.send({accdetails: accdetails});
      //     }
      //     });
      //     user = null;
      //   }
      // }