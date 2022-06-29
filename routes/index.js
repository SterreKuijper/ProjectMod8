var express = require('express');
var router = express.Router();
var tcpSocket = require('../modules/tcpserver');

const app = express()
const port = 3000

/* import the pg-promise package */
var pgp = require('pg-promise')();
/* define the connection details */
var conn = {
      host: 'bronto.ewi.utwente.nl',
      port: 5432,
      database: 'dab_dda21222b_62',
      user: 'dab_dda21222b_62',
      password: 'WeStenBerre12'
};
/* make the connection */
var db = pgp(conn);

/* GET index page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Project Module 8: Moose Events', data:[] });
});

/* GET standby-screen page. */
router.get('/standby-screen', function(req, res, next) {
      res.render('standby-screen', { title: 'Standby screen', data:[], present: tcpSocket.getPresentStatus() });
   });

/* GET experience page. */
router.get('/experience', function(req, res, next) {
      res.render('experience', { title: 'Experience', data:[], present: tcpSocket.getPresentStatus() });
   });

/* GET wrapped page. */
router.get('/wrapped', function(req, res, next) {
      res.render('wrapped', { title: 'Experience', data:[], time: req.query.time, genre: req.query.genre });
   });

/* GET overview page. */
router.get('/overview', function(req, res, next) {
      res.render('overview', { title: 'Project Module 8: Moose Events', data:[] });
   });

/* GET profile page */
router.get('/profile', function(req, res, next) {
      res.render('profile', {title: 'Profile', data:[]});
})

/* GET visualisation page */
router.get('/visualisation', function(req, res, next) {
      res.render('visualisation', {title: 'Audio visualisation', data:[]});
})

/* GET animation page */
router.get('/animation', function(req, res, next) {
      res.render('animation', {title: 'Animation', data:[]});
})

/* GET animation page */
router.get('/input', function(req, res, next) {
      res.render('input', {title: 'Input', data:[]});
})

// router.get('/getgrades/', function(req, res, next) {
//   // show what information is passed from the browser
//   console.log(req.query);
//   console.log(req.body);
//   // retrieve the contents of the year-field in the form (as it was sent from the browser)
//   var student_id = req.query.student_id;
//   // run database query
//   db.manyOrNone('SELECT course, grade, quarter, year, course_code FROM srs.grades WHERE student_id=${student_id}',
//       {student_id: student_id})
//     .then(data => {
//       // if success, show page with resulting data using index.ejs template
//       res.render('index', { title: 'Grades of '+student_id, data:data });
//     })
//     .catch(error => {
//       // if error, show page with error message and no data using the same template
//       console.log(error); // printing the error
//       res.render('index', { title: 'Grades of '+student_id+' -> error', data:[] });
//     });
// });



module.exports = router;
