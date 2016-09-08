$(function(){
  $('.dal').click(function(e){
    var target = $(e.target);
    var id = target.data('id');
    var tr = $('.item-id-' + id);
    $.ajax({
      type : 'DELETE',
      url:'/admin/?id='+id
    })
    .done(function(results){
      if (results.success === 1) {
        if(tr.length > 0){
          tr.remove()
        }
      }
    })
  })
  $('.das').click(function(e){
    var target = $(e.target);
    var id = target.data('id');
    var tr = $('.item-id-' + id);
    $.ajax({
      type : 'DELETE',
      url:'/admin/user/?id='+id
    })
    .done(function(results){
      if (results.success === 1) {
        if(tr.length > 0){
          tr.remove()
        }
      }
    })
  })
    $('.dae').click(function(e){
    var target = $(e.target);
    var id = target.data('id');
    var tr = $('.item-id-' + id);
    $.ajax({
      type : 'DELETE',
      url:'/admin/category/?id='+id
    })
    .done(function(results){
      if (results.success === 1) {
        if(tr.length > 0){
          tr.remove()
        }
      }
    })
  })
})
