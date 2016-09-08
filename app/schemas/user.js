var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var ObjectId = Schema.Types.ObjectId

var bcrypt = require('bcrypt-nodejs')  //生成随机盐
var SALT_WORK_FACTOR = 10;
//一般的网站是使用加盐的密码，加盐的密码哈希后的值
//哈希 == 算法 不可逆的
//hash + 加盐
var UserSchema = new Schema({
  // unique: true,  唯一的
  name: {
    unique: true,
    type: String
  },
  password: String,
  role: {
      type: Number,
      default: 0
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
UserSchema.pre('save',function(next){
  var user = this
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }else {
    this.meta.updateAt = Date.now()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt){
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password,salt,null,function(err,hash){
          if(err) return next(err)
            user.password = hash
            next()
        })
    })
})

//实例方法
UserSchema.methods = {
  comparePassword: function(_password,cb){
    bcrypt.compare(_password,this.password,function(err,isMatch){
      if (err) return cb(err)
      cb(null,isMatch)
    })
  }
}

//静态方法
UserSchema.statics = {
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



module.exports = UserSchema
