var Movie = require('../models/movie')
var Category = require('../models/category')
exports.index = function(req,res) {
  Category
    .find({})
    .populate({path:'movies', options:{limit:5}})
    .exec(function(err,category){
      if(err){
        console.log(err)
      }
      res.render('index',{
          title: '健身吧_696px_中国专业健身网',
          category: category
      })

    })
}
