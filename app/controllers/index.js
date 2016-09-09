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
        var category = categories[0] || {}
        var movies = category.movies || []
      res.render('index',{
          title: '健身吧_696px_中国专业健身网',
          category = category,
          movies: movies
      })

    })
}


exports.search = function(req,res) {
  var catId = req.query.cat
  var search = req.query.search
  var page = parseInt(req.query.p,10) || 0
  var count = 20
  var index = page * count
  if(catId){
    Category
      .find({_id: catId})
      .populate({path:'movies',select: 'title poster'})
      .exec(function(err,categories){
        if(err){
          console.log(err)
        }
        var category = categories[0] || {}
        var movies = category.movies || []
        var results = movies.slice(index,index + count)

        res.render('list',{
            title: '健身吧_696px_中国专业健身网',
            keyword:  category.name,
            currentPage: (page + 1),
            query: 'cat=' + catId,
            totalpage: Math.ceil(movies.length / count),
            movies: results
        })

      })
  }
  else {
      Movie
        .find({title: new RegExp(search+'.*','i')})
        .exec(function(err,movies){
            if(err){
                console.log(err)
            }
            var results = movies.slice(index,index +count)

            res.render('list',{
                title: '健身吧_696px_中国专业健身网',
                keyword: search,
                currentPage: (page + 1),
                totalpage: Math.ceil(movies.length / count),
                movies: results,
                query: 'search=' + search
            })
        })
      }
}
