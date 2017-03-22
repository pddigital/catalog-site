const Brand = require('./Brand');
const path = require('path');
const multer  = require('multer');

module.exports = {

fileUpload(req, res){

  const uploadDir = './uploads';
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
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
        if (ext !== '.png' && ext !='.PNG' && ext !== '.jpg' && ext !='.JPEG' && ext !='.JPG' && ext !== '.jpeg' && ext !== '.pdf' && ext !== '.PDF') {
          return res.status(500).json('Only JPG, PNG, PDF file types accepted!');
        }
        cb(null, true)
    }

  const upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter }).single('theFile');

  upload(req, res, (err)=> {
    if (err) {
      console.log(err)
      return res.status(500).json(err);
    }
      filePayload = {
        fileName: `http://localhost:3000/uploads/${req.fileName}`
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
      req.catalog = {}
      req.catalog.brands = brands;
      next();
  });
},
  createBrand(req, res) {
    new Brand(req.body).save((err, brand) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json(brand);
    });
  },
  deleteBrand(req, res, next) {
       Brand.findByIdAndRemove(req.params.id, (err, brand)=> {
         if(err) {
             return res.status(500).json(err)
           }
             return res.status(200).json(brand)
         });
       },

  updateBrand(req, res, next) {
      Brand.findByIdAndUpdate(req.params.id, req.body, (err, brand)=> {
           if(err) {
               return res.status(500).json(err)
             }
               return res.status(200).json(req.body)
           });
         },
}
