
exports.new = function(req,res) {
    res.render('admintables',{
        title: '管理启动'
    })
}
exports.form = function(req,res) {
    res.render('adminform',{
        title: 'form启动'
    })
}
