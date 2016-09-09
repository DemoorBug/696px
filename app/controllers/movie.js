var _ = require('underscore')  /*新字段替换老字段*/
var Movie = require('../models/movie')
var User = require('../models/user')
var Category = require('../models/category')

var fs = require('fs')
var path = require('path')

exports.detail = function(req,res) {
  var id = req.params.id;
  Movie.update({_id:id},{$inc: {pv:1}},function(err){
        if(err){
            console.log(err)
        }
    })
    Movie.findById(id,function(err,movie){
  Category.findById(movie.category,function(err,category){
      res.render('ner',{
          title: movie.title,
          category: category,
          movie: movie
      })
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
  if(req.poster) {
        movieObj.poster = req.poster
    }
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
      if (categoryId) {
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
      else {
        return res.redirect('/admin/form')
      }
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
          categories : category,
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

exports.savePoster = function(req,res,next) {
    var posterData = req.files.uploadPoster
    console.log(req.files)
    var filePath = posterData.path
    var originalFilename = posterData.originalFilename
    if (originalFilename) {
        fs.readFile(filePath,function(err,data){
            var timestamp = Date.now()
            var type = posterData.type.split('/')[1]
            var poster = timestamp + '.' + type
            var newPath = path.join(__dirname,'../../','/public/upload/'+poster)
            fs.writeFile(newPath,data,function(err){
                req.poster = poster;
                next()
            })
        })
    }
    else {
        next()
    }
}
