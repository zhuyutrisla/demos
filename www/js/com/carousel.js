define(['jquery'],function( $ ){

  var Carousel = (function(){
    function Rotation($ct){
      this.$ct = $ct
      this.init()
      this.bind()
    }
    Rotation.prototype.init = function(){
      var $contain = this.$contain= this.$ct.find('.container')
      var $imgs = this.$imgs = this.$ct.find('.container>li')
      this.imgCount = $imgs.length
      this.imgWidth = $imgs.width()
      this.curPage = 0
      this.isRunning = false
      $contain.append($imgs.first().clone())
      $contain.prepend($imgs.last().clone())
      $contain.width(this.imgWidth*(this.imgCount+2))
      $contain.css({'left': -this.imgWidth})
    }
    Rotation.prototype.bind = function(){
      var _this = this
      this.$ct.find('.pre').on('click',function(e){
        e.preventDefault()
        _this.playPre(1)
      })
      this.$ct.find('.next').on('click',function(e){
        e.preventDefault()
        _this.playNext(1)
      })
      this.$ct.find('.bullet>li').on('click',function(){
        var index = $(this).index()
        console.log(index)
        console.log(_this.curPage)
        if (index > _this.curPage){
           _this.playNext(index-_this.curPage)
        }else if (index < _this.curPage){
          _this.playPre(_this.curPage - index)
        }
      })
    }
    Rotation.prototype.playPre =function(len){
      var _this = this
      if (_this.isRunning){
        return
      }
      _this.isRunning = true
      this.$ct.find('.container').animate({"left" :"+="+len*this.imgWidth},function(){
        _this.curPage -= len
        if (_this.curPage < 0){
          _this.$contain.css({'left': -_this.imgWidth*_this.imgCount})
          _this.curPage = _this.imgCount-1
        }
        _this.setBack()
        _this.isRunning = false
      })
    }
    Rotation.prototype.playNext =function(len){
      var _this = this
      if (_this.isRunning){
        return
      }
      _this.isRunning = true
      this.$ct.find('.container').animate({'left' : '-='+len*this.imgWidth},function(){
        _this.curPage += len
        if (_this.curPage === _this.imgCount){
           _this.$contain.css({"left": -_this.imgWidth})
           _this.curPage = 0
        }
         _this.setBack()
         _this.isRunning = false
      })
    }
    Rotation.prototype.setBack = function(){
      this.$ct.find('.bullet>li').removeClass("active").eq(this.curPage).addClass('active')
    }
    return {
      init:  function($ct){
        $ct.each(function(index,node){
          new Rotation($(node))
        })
      }
    }
  })()  
  return Carousel
})



// Carousel.init($('.wrapper'))