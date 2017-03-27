const User = require('./User');
const password = require('password-hash-and-salt');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

module.exports = {
  loggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return res.json(true);
    }
    else {
      return res.json(false);
    }
  },
  logOut(req, res, next) {
        req.logout();
        req.session.destroy((err)=> {
        return res.json(true);
        })
  },
  authenticate(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { return res.json(false); }

        if (!user) { return res.json(false); }
       
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json(true)
        });
  })(req, res, next);
  },
  isAuthed(req, res, next){
    if (req.isAuthenticated()) {
      next();
    }
    else {
      return res.json("NOT AUTHORIZED!");
    }
  },
  getHash(req, res, next){
    password(req.body.password).hash(function(error, hash) {
    if(error) {
        throw new Error('Something went wrong!');
      }
    // Store hash (incl. algorithm, iterations, and salt)
    return res.json(hash);

  })
  },
  timedOut(req, res, next){
    setTimeout(()=> {
      next()
    }, 1000);
  }
}
