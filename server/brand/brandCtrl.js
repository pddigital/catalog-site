const Brand = require('./Brand');
const path = require('path');
const multer = require('multer');

module.exports = {

    fileUpload(req, res) {

        const uploadDir = './uploads';

        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, uploadDir)
            },
            filename: function(req, file, cb) {
                req.fileName = Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-');
                cb(null, req.fileName)
            }
        })

        const limits = {
            fileSize: 10000000,
            files: 1,
            parts: 1
        }

        const fileFilter = function(req, file, cb) {
            let ext = path.extname(file.originalname)
            if (ext !== '.png' && ext != '.PNG' && ext !== '.jpg' && ext != '.JPEG' && ext != '.JPG' && ext !== '.jpeg' && ext !== '.pdf' && ext !== '.PDF') {
                return res.status(500).json('Only JPG, PNG, PDF file types accepted!');
            }
            cb(null, true)
        }

        const upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter }).single('theFile');

        upload(req, res, (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json(err);
            }
            filePayload = {
                fileName: `/uploads/${req.fileName}`
            }

            return res.status(200).json(filePayload);
        })

    },

    getBrands(req, res) {
        Brand.find({}, (err, brands) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(brands);
        });
    },
    getAllBrands(req, res, next) {
        Brand.find({}, (err, brands) => {
            if (err) {
                return res.status(500).json(err);
            }

            let brandsWithSlugs = [];

            brands.forEach((brand) => {
                let copy = Object.assign({}, brand._doc);
                copy.slug = brand.name.toLowerCase().replace(/&/g, "and").replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').split(' ').join('-');
                brandsWithSlugs.push(copy);
            })

            req.dashboard = {}
            req.dashboard.brands = brandsWithSlugs;
            next();
        });
    },
    createBrand(req, res) {
        new Brand(req.body).save((err, brand) => {
            if (err) {
                return res.status(500).json(err);
            }
            let copy = Object.assign({}, brand._doc);
            copy.slug = brand.name.toLowerCase().replace(/&/g, "and").replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').split(' ').join('-');
            return res.status(201).json(copy);
        });
    },
    deleteBrand(req, res, next) {
        Brand.findByIdAndRemove(req.params.id, (err, brand) => {
            if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).json(brand)
        });
    },

    updateBrand(req, res, next) {
        Brand.findByIdAndUpdate(req.params.id, req.body, (err, brand) => {
            if (err) {
                return res.status(500).json(err)
            }
            let copy = Object.assign({}, req.body);
            copy.slug = req.body.name.toLowerCase().replace(/&/g, "and").replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').split(' ').join('-');
            return res.status(200).json(copy)
        });
    },
}