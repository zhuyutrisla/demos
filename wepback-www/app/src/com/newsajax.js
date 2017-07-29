var $ = require('../lib/jquery.js')


function NewsAjax(){
  this.curPage = 1
  this.perPageCount = 10
  this.itemCount = parseInt($('.newscontain').width()/$('.newscontain>li').width())
  this.Arr = []
  for (var i=0; i<this.itemCount;i++){
    this.Arr[i] = 0
  }
  this.loadNews()
  this.bind()
}

NewsAjax.prototype.bind = function(){
  var _this = this
  $('.newsloadMo').on("click",function(){

    _this.loadNews()
  })
}


NewsAjax.prototype.loadNews = function(){
  var _this = this
  _this.getData(function(newList){
    $.each(newList, function(index,news){
      var $nodes = _this.appendHtml(news)
      $nodes.find('img').on('load',function(){
         $('.newscontain').append($nodes)
        _this.waterFull($nodes)       
      })
    })
  })   
}



NewsAjax.prototype.getData = function(callback){
  var _this = this
  $.ajax({
    url:  'http://platform.sina.com.cn/slide/album_tech',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    cache:'false',
    data: {
      app_key:'1271687855',
      num: _this.perPageCount,
      page: _this.curPage
    }
  }).done(function(ret){
    if (ret && ret.status  && ret.status.code ==="0"){
      callback(ret.data)
      _this.curPage++
    }
  })
}

NewsAjax.prototype.appendHtml = function(news){
  var html = ''
  html += '<li><a href="'+ news.url+'"><img src="'+ news.img_url + '"></a>'
  html += '<h2>'+news.short_name+'</h2>'
  html += '<span>'+news.short_intro+'</span></li>'
  return $(html)
}



NewsAjax.prototype.waterFull = function($node){
  var minHeight = Math.min.apply(null,this.Arr)
  var minIndex = this.Arr.indexOf(minHeight)
  $node.css({
    top: this.Arr[minIndex],
    left: $node.outerWidth(true) * minIndex
  })

  this.Arr[minIndex] += $node.outerHeight(true)
  $('.newscontain').height(Math.max.apply(null,this.Arr))

}

module.exports =  NewsAjax







// new NewsAjax()