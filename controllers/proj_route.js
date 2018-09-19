var express = require('express');
// const app = express();
// var session = require('express-session');
// var cookieParser = require('cookie-parser');


module.exports.set = function(app) {
    app.set('trust proxy', 1) // trust first proxy
    var bodyParser = require('body-parser');
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(cookieParser());
    // app.use(session({
    //     secret: '#$^@#$TGESDG%WEY&WE$^aegho%$*)(',
    //     resave: false,
    //     saveUninitialized: true,
    //     name: 'sessionId'
    // }));

    app.get("/myprojects/inbox", (req, res)=> {
        res.render('inbox');
    });
    
    app.get("/myprojects/projects", (req, res)=> {
        res.render('current');
    });

    // app.get('/projlist',(req,res) => {
    //     var getsession = req.session.name;  
    //     if (getsession != undefined){
    //         var fields = getsession.split(',');
    //         var acctype = fields[0];
    //         var user = fields[1];

    //         let sql = `SELECT * FROM playposts WHERE stud = '${user}'`;
    //         var projectlist = [];
    //         var i = 0;
    //         playdb.query(sql, (err,result)=>{
    //             if (err) throw err;
    //             if (!err) {
    //             // console.log(result);
    //             result.forEach((data) => {
    //                 if (result[i].title != null && result[i].company != null &&result[i].des != null){
    //                     projectlist.push(data);
    //                 }
    //                 i++;
    //             });
    //             res.send({projectlist: projectlist});
    //             }
    //         });
    //     }
    // });
}