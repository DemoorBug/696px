var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
var Category = require('../app/controllers/category')



module.exports = function(app) {

app.use(function(req,res,next){
    var _user = req.session.user
    app.locals.user = _user;
    return next()
})

// Index
  app.get('/',Index.index)

// movie
  app.get('/movie/:id', Movie.detail)

// admin
  app.get('/admin',User.signinRequired,User.adminRequired,Movie.tables)
  app.get('/admin/form',User.signinRequired,User.adminRequired,Movie.form)
  app.delete('/admin',User.signinRequired,User.adminRequired, Movie.del)
  app.get('/admin/user',User.signinRequired,User.adminRequired,Movie.user)
  app.get('/admin/user/update/:id',User.signinRequired,User.adminRequired,Movie.userUpdate)
  app.delete('/admin/user',User.signinRequired,User.adminRequired, Movie.des)
// 存储
  app.post('/admin/user/save',User.signinRequired,User.adminRequired, Movie.userSave)
  app.post('/admin/save',User.signinRequired,User.adminRequired, Movie.save)
// 更新
  app.get('/admin/update/:id',User.signinRequired,User.adminRequired, Movie.update)
// 分类
  app.get('/admin/category',User.signinRequired,User.adminRequired, Category.category)
  app.post('/admin/category/save',User.signinRequired,User.adminRequired, Category.categorySave)
// user
  app.post('/user/signup', User.signup)
  app.post('/user/signin', User.signin)
  app.get('/logouto',User.logouto)
// catgory
  app.get('/admin/category/list',User.signinRequired,User.adminRequired, Category.list)
  app.get('/admin/category/update/:id',User.signinRequired,User.adminRequired, Category.userUpdate)
  app.delete('/admin/category',User.signinRequired,User.adminRequired, Category.dae)
}
