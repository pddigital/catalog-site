const loginCtrl = require('../login/loginCtrl');
const brandCtrl = require('./brandCtrl');
const catalogCtrl = require('../catalog/catalogCtrl');

module.exports = app => {
    app.post('/api/file', loginCtrl.isAuthed, brandCtrl.fileUpload);
    app.get('/api/brands', brandCtrl.getAllBrands, catalogCtrl.getAllCatalogs);
    app.post('/api/brand', loginCtrl.isAuthed, brandCtrl.createBrand);
    app.delete('/api/brand/:id', loginCtrl.isAuthed, brandCtrl.deleteBrand);
    app.put('/api/brand/:id', loginCtrl.isAuthed, brandCtrl.updateBrand);
}