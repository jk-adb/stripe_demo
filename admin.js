const router = require("express").Router();

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'all';

var nedb = require('nedb');
var db = {};
db.products = new nedb({
    filename: 'data/products.db'
});
db.products.loadDatabase();
//To  be replaced to sqlite
//https://qiita.com/zaburo/items/a155cbc02832b501a8dd

router.get("/", function (request, response) {
    db.products.find({}, function (error, result){
        if(error){
            console.log("error");
            return;
        }
        let obj = {}; 
        for (let i=0; i<result.length; i++){
            obj[i] = result[i]
            console.log(obj[i]);
        }
        response.render('./admin/index', {products: obj, len: result.length});
    });
});

router.post("/", function (request, response) {
    var data = extract(request);   
    regist(data);
    response.redirect("/admin");
});

var regist = function (data) {
    var product = {
        name: data.itemname,
        description: data.itemdescription,
        price: data.itemprice,
        stock: data.stockamount
    };
    return db.products._insert(product, function(error, newProduct){
        if(error != null){
            console.error(error);
        }
        console.log(newProduct)
    });
}

var extract = function (request) {
    return {
      itemname: request.body.itemname,
      itemdescription: request.body.itemdescription,
      itemprice: request.body.itemprice,
      stockamount: request.body.stockamount
    };
};
    
router.post("/complete", function (request, response) {
    var data = extract(request);
   
    if (validate(data) === false) {
      return response.render("./admin/input", data);
    }
   
});
  

 
module.exports = router;