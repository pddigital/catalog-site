const Brand = require('./Brand');

module.exports = {

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
