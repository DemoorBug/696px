var _ = require('underscore')  /*新字段替换老字段*/
var Movie = require('../models/movie')
var User = require('../models/user')
var Category = require('../models/category')

exports.detail = function(req,res) {
  var id = req.params.id;
  Movie.findById(id,function(err,movie){
    res.render('ner',{
        title: movie.title,
        movie: movie
    })
  })
}

exports.tables = function(req,res) {
  Movie.fetch(function(err,movies) {
    res.render('admintables',{
        title: '内容列表页',
        update: '内容',
        movies: movies
    })
  })
}
exports.form = function(req,res) {
  Category.find({},function(err,categories){
    res.render('adminform',{
        title: '录入管理页',
        update: '新增内容',
        categories: categories,
        movie: {}
    })
  })
}

//存储
exports.save = function(req,res) {
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie
  if(id) {
    Movie.findById(id,function(err,movie){
      if (err) {
        console.log(err)
      }
      _movie = _.extend(movie,movieObj)
      _movie.save(function(err,movie){
        if(err){
          console.log(err)
        }
        return res.redirect('/admin')
      })
    })
  }
  else{
    _movie = new Movie(movieObj)
    var categoryId = movieObj.category
    _movie.save(function(err,movie){
      if(err){
        console.log(err)
      }
    Category.findById(categoryId,function(err,category){
              category.movies.push(movie._id)
              category.save(function(err,category){
                  return res.redirect('/admin')
              })
          })
    })
  }
}

exports.update = function(req,res){
  var id = req.params.id
  if(id){
    Category.fetch(function(err,category) {
      Movie.findById(id,function(err,movie){
        res.render('adminform',{
          title: '内容更新',
          update: '更新',
          category: category,
          movie: movie
        })
      })
    })
  }
}

exports.del =  function(req,res){
    var id = req.query.id;
    if(id) {
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }
            else {
                res.json({success:1})
            }
        })
    }

}

exports.user = function(req,res) {
  User.fetch(function(err,Users) {
    res.render('adminuser',{
        title: '用户列表页',
        update: '数据',
        movies: Users
    })
  })
}

exports.userUpdate = function(req,res){
  var id = req.params.id
  if(id){
    User.findById(id,function(err,users){
      res.render('adminuserUpdate',{
        title: '用户信息更新',
        update: '更新',
        users: users
      })
    })
  }
}

exports.userSave = function(req,res) {
  var id = req.body.users._id
  var userObj = req.body.users
  var _user
    User.findById(id,function(err,user){
      if (err) {
        console.log(err)
      }
      _user = _.extend(user,userObj)
      _user.save(function(err,movie){
        if(err){
          console.log(err)
        }
        return res.redirect('/admin/user')
      })
    })
}
exports.des =  function(req,res){
    var id = req.query.id;
    if(id) {
        User.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }
            else {
                res.json({success:1})
            }
        })
    }

}
