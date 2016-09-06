var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var Admin = require('../app/controllers/admin')



module.exports = function(app) {
// Index
  app.get('/',Index.index)

// movie
  app.get('/movie', Movie.detail)

// admin
  app.get('/admin',Admin.new)
  app.get('/admin/form',Admin.form)
}
