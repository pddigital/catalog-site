const User = require('./User');
const password = require('password-hash-and-salt');

module.exports = {
  loggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return res.json(true);
    }
    else {
      return res.json(false);
    }d
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
