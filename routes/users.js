var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/users');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req,res,next) => {
  User.findOne({username:req.body.username}) 
  .then((user) => {
    if (user==null) {
      err = new Error('Username exists.')
      err.status=401;
      next(err);
    }
    else {
      User.create(
        {
          username:req.body.username,
          password:req.body.username
        }
      ).then((user) => {
        res.statuscode=200;
        res.setHeader('Content-Type','application/json');
        res.json({status:'Registered',user:user});
      })
    }
  })
})
router.post('/login',(req,res,next) => {
  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');                        
        err.status = 401;
        next(err);
        return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    User.findOne({username:req.body.username})
    .then((user) => {
      if (user === null) {
        err = new Error('Username does not exist');
        err.status=403;
        next(err);
      }
      else if (user.password!==password) {
        err = new Error('Your password does not match.');
        err.status=403;
        next(err);
      }
      else {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are authenticated!')}
      }
).catch((err) => next(err))
    }

  else {
       res.statusCode=200;
       res.setHeader('Content-Type','text/plain');
       res.end('You are authenticated.');

    }
    
  })

router.get('/logout',(req,res,next) => {
  if (req.session) {
    req.session.destroy();
    req.clearCookie('session-id');
    req.redirect('/');
  }
  else{
    var err= new Error('You are not logged in.');
    err.status=403;
    next(err);
  }
})

module.exports = router;
