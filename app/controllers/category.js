var Category = require('../models/category')
var _ = require('underscore')  /*新字段替换老字段*/

exports.category = function(req,res) {
  Category.fetch(function(err,category) {
    res.render('category_admin',{
        title: '分类添加',
        update: '分类',
        category: category
    })
  })
}

exports.categorySave = function(req,res) {
  var id = req.body.category._id
  var categoryObj = req.body.category
  var _category
  if(id) {
    Category.findById(id,function(err,category){

      if (err) {
        console.log(err)
      }
      _category = _.extend(category,categoryObj)
      _category.save(function(err,category){
        if(err){
          console.log(err)
        }
        return res.redirect('/admin/category/list')
      })
    })
  }
  else{
    _category = new Category(categoryObj)
    _category.save(function(err,category){
      if(err){
          console.log(err)
        }
        return res.redirect('/admin/category/list')
        // res.redirect('/category/'+ category._id)
    })
  }
}

exports.list = function(req,res) {
  Category.fetch(function(err,categorys) {
    res.render('admin_categoryList',{
        title: '分类列表页',
        update: '分类',
        movies: categorys
    })
  })
}

exports.dae =  function(req,res){
    var id = req.query.id;
    if(id) {
        Category.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }
            else {
                res.json({success:1})
            }
        })
    }

}
exports.userUpdate = function(req,res){
  var id = req.params.id
  if(id){
    Category.findById(id,function(err,category){
      res.render('category_admin',{
        title: '用户信息更新',
        update: '更新',
        category: category
      })
    })
  }
}
