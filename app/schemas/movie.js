var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var MovieSchema = new Schema({
  title: String,
  source: String,
  summary: String,
  poster: String,
  pv: {
      type: Number,
      default: 0
  },
  category: {
      type: ObjectId,
      rel: 'Category'
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt : {
      type: Date,
      default: Date.now()
    }
  }
})

//每次在存储一个数据之前，都会来调用下这个方法
MovieSchema.pre('save',function(next){
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }else {
    this.meta.updateAt = Date.now()
  }
  next()
})

MovieSchema.statics = {
  fetch : function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById : function (id,cb) {
    return this
      .findOne({_id: id})
      .sort('meta.updateAt')
      .exec(cb)
  }
}




module.exports = MovieSchema
