var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')



module.exports = function(app) {
// Index
  app.get('/',Index.index)

// movie
  app.get('/movie/:id', Movie.detail)

// admin
  app.get('/admin',Movie.tables)
  app.get('/admin/form',Movie.form)
  app.delete('/admin', Movie.del)
// 存储
  app.post('/admin/save', Movie.save)
// 更新
  app.get('/admin/update/:id', Movie.update)
}
