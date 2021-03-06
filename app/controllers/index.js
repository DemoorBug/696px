var Movie = require('../models/movie')
var Category = require('../models/category')
exports.index = function(req,res) {
  Category
    .find({})
    .populate({path:'movies'})
    .exec(function(err,categories){
      if(err){
        console.log(err)
      }
      //最热文章
      var resOne = categories[0].movies
      var results = resOne.slice(resOne.length-4,resOne.length)
      //首页焦点文字
      var focus = categories[1].movies
      var Indexfocus = focus.slice(focus.length-6,focus.length)
      //焦点图
      var restherr = categories[2].movies
      var imgEm = restherr.slice(restherr.length-3,restherr.length)
      // 健身误区
      var onstherr = categories[3].movies
      var jswq = onstherr.slice(onstherr.length-15,onstherr.length)
      // 生活百科
      var onsfor = categories[4].movies
      var shbk = onsfor.slice(onsfor.length-15,onsfor.length)
      // 运动损伤
      var onserr = categories[5].movies
      var ydss = onserr.slice(onserr.length-15,onserr.length)
      // 最新关注
      var onszui = categories[6].movies
      var zxgz = onszui.slice(onszui.length-15,onszui.length)
      // 最新关注
      var onsxw = categories[7].movies
      var xwgg = onsxw.slice(onsxw.length-8,onsxw.length)
      // 健康快讯
      var onskx = categories[8].movies
      var jkkx = onskx.slice(onskx.length-6,onskx.length)
      // 饮食健康
      var onscc = categories[12].movies
      var ysjk = onscc.slice(onscc.length-10,onscc.length)
      res.render('index',{
          title: '健身吧_696px_中国专业健身网',
          category: categories,
          resOne:results,
          Indexfocus:Indexfocus,
          imgEm: imgEm,
          jswq: jswq,
          shbk: shbk,
          ydss: ydss,
          zxgz: zxgz,
          xwgg: xwgg,
          jkkx: jkkx,
          ysjk: ysjk
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
