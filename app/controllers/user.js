var _ = require('underscore')  /*新字段替换老字段*/
var User = require('../models/user')
//signin
exports.signup = function(req,res){
  var _user = req.body.user

  User.findOne({name: _user.name},function(err,user){
    if(err){
      console.log(err)
    }
    if(user){
      return res.redirect('/')
    }
    else {
      var user = new User(_user)
      user.save(function(err,user){
        if(err){
          console.log(err)
        }
        return res.redirect('/')
      })
    }
  })
}

exports.signin = function(req,res){
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findOne({name: name},function(err,user){
    if(err){
      console.log(err)
    }
    if(!user){
      return res.redirect('/')
    }
    //这个方法暂时也是没有的，来到 ../schemas/user
    user.comparePassword(password,function(err,isMatch) {
      if(err){
        console.log(err)
      }
      if(isMatch){
        req.session.user = user
        return res.redirect('/')
      }
      else{
        return res.redirect('/')
      }
    })
  })
}

exports.logouto = function(req,res){
  delete req.session.user
  return res.redirect('/')
}


exports.signinRequired = function(req,res,next){
    var user = req.session.user

    if (!user) {
        return res.redirect('/')
    }

    next()
}
exports.adminRequired = function(req,res,next){
    var user = req.session.user

    if (user.role <= 10) {
        return res.redirect('/')
    }

    next()
}
