const Catalog = require('./Catalog');

module.exports = {

    getCatalogs(req, res) {
        Catalog.find({}, (err, catalogs) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(catalogs);
        });
    },
    getAllCatalogs(req, res, next) {
        Catalog.find({}, (err, catalogs) => {
            if (err) {
                return res.status(500).json(err);
            }
            req.dashboard.catalogs = catalogs;
            return res.status(201).json(req.dashboard);
        });
    },
    createCatalog(req, res) {

        new Catalog(req.body).save((err, catalog) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(201).json(catalog);
        });
    },
    deleteCatalog(req, res, next) {
        Catalog.findByIdAndRemove(req.params.id, (err, catalog) => {
            if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).json(catalog)
        });
    },

    updateCatalog(req, res, next) {
        Catalog.findByIdAndUpdate(req.params.id, req.body, (err, catalog) => {
            if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).json(req.body)
        });
    },
}