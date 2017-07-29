var $ = require('../lib/jquery.js')


var GoTop = (function(){

  function GotoTop($ct){
    this.$ct = $ct
    this.target
    this.createNode()  
    this.bindEvent()
    this.hiddenClick()    
  }


  GotoTop.prototype.createNode = function(){
    this.$target = $('<div id="click">回到顶部</div>')
    this.$ct.append(this.$target)
  }

  GotoTop.prototype.bindEvent = function(){
    $('#click').on('click',function(){
      $(window).scrollTop(0)
    })

  }

  GotoTop.prototype.hiddenClick = function(){
    $(window).on("scroll",function(){
      if ($(window).scrollTop() === 0){
        $('#click').hide()
      }else{
        $('#click').show() 
      }
    })
  }

  return {
    init: function($ct){
      new GotoTop($ct)
    }
  }
})()

module.exports = GoTop






// GoTop.init($('body'))




/*
css

#click{
  width: 100px;
  height: 40px;
  background: #ccc;
  border-radius: 5px;
  position: fixed;
  bottom: 10px;;
  right: 10px;
  z-index: 10;
  text-align: center;
  line-height: 40px;
}  


*/