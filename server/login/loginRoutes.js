const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const loginCtrl = require('./loginCtrl');

module.exports = app => {

app.post('/api/login', loginCtrl.timedOut, loginCtrl.authenticate);
app.get('/api/logout', loginCtrl.logOut);
app.get('/api/isauthed', loginCtrl.loggedIn);
app.post('/api/gethash', loginCtrl.getHash);
}
