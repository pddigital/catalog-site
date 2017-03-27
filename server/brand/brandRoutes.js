const loginCtrl = require('../login/loginCtrl');
const brandCtrl = require('./brandCtrl');
const catalogCtrl = require('../catalog/catalogCtrl');

module.exports = app => {
  app.post('/api/file', brandCtrl.fileUpload);
  app.get('/api/brands', brandCtrl.getAllBrands, catalogCtrl.getAllCatalogs);
  app.post('/api/brand', brandCtrl.createBrand);
  app.delete('/api/brand/:id', brandCtrl.deleteBrand);
  app.put('/api/brand/:id', brandCtrl.updateBrand);
}
