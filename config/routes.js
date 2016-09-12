var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
var Category = require('../app/controllers/category')

var Categoes = require('../app/models/category')

module.exports = function(app) {

app.use(function(req,res,next){
    var _user = req.session.user
    app.locals.user = _user;
    return next()
})
app.use(function(req,res,next){
    Categoes
      .find({})
      .populate({path:'movies'})
      .exec(function(err,category){
        if(err){
          console.log(err)
        }
        // 新闻热词榜
        var twscc = category[13].movies
        var xwrcb = twscc.slice(twscc.length-6,twscc.length+6)
        // 热点焦距
        var wcscc = category[14].movies
        var rdjj = wcscc.slice(wcscc.length-4,wcscc.length+4)
        // 健身误区
        var asscc = category[12].movies
        var jswqq = asscc.slice(asscc.length-4,asscc.length+4)

        app.locals.xwrcb = xwrcb
        app.locals.rdjj = rdjj
        app.locals.jswqq = jswqq
        app.locals.categorys = category

        return next()
      })
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
  app.post('/admin/save',User.signinRequired,User.adminRequired,Movie.savePoster ,Movie.save)
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
//
 app.get('/results',Index.search)
}
