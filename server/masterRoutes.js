const loginRoutes = require('./login/loginRoutes');
const brandRoutes = require('./brand/brandRoutes');
const catalogRoutes = require('./catalog/catalogRoutes');

module.exports = app => {
  loginRoutes(app);
  brandRoutes(app);
  catalogRoutes(app);
}
