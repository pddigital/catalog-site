const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const loginCtrl = require('./loginCtrl');

module.exports = app => {

app.post('/api/login', loginCtrl.timedOut, loginCtrl.authenticate);

app.get('/api/logout', (req, res)=> {
  req.logout();
  req.session.destroy((err)=> {
        res.redirect('/');
    });
})

app.get('/api/isauthed', loginCtrl.loggedIn);
app.post('/api/gethash', loginCtrl.getHash);
}
