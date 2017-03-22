const loginCtrl = require('../login/loginCtrl');
const brandCtrl = require('../brand/brandCtrl');
const catalogCtrl = require('./catalogCtrl');

module.exports = app => {

  app.get('/api/everything', brandCtrl.getAllBrands, catalogCtrl.getAllCatalogs);
  app.post('/api/catalog', catalogCtrl.createCatalog);
  app.delete('/api/catalog/:id', loginCtrl.isAuthed, catalogCtrl.deleteCatalog);
  app.put('/api/catalog/:id', loginCtrl.isAuthed, catalogCtrl.updateCatalog);

}
  