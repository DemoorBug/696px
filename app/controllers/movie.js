var Movie = require('../models/movie')
var _ = require('underscore')  //新字段替换老字段

exports.detail = function(req,res) {
  var id = req.params.id;
  console.log(id)
  Movie.findById(id,function(err,movie){
    console.log('movie'+movie)
    if(err){
      console.log('err'+err)
    }
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
        // update: '内容',
        movies: movies
    })
  })
}
exports.form = function(req,res) {
  Movie.fetch(function(err,movie) {
    res.render('adminform',{
        title: '录入管理页',
        // update: '新增内容',
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
        res.redirect('/')
      })
    })
  }
  else{
    _movie = new Movie(movieObj)

    _movie.save(function(err,movie){
      if(err){
          console.log(err)
        }
        res.redirect('/')
        // res.redirect('/movie/'+ movie._id)
    })
  }
}

exports.update = function(req,res){
  var id = req.params.id
  if(id){
    Movie.findById(id,function(err,movie){
      res.render('adminform',{
        title: '内容更新',
        // update: '更新',
        movie: movie
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
