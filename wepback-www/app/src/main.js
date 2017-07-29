var $ = require('./lib/jquery.js')
var GoTop = require('./com/gotop.js')
var Carousel = require('./com/carousel.js')
var NewsAjax =require('./com/newsajax.js')	



GoTop.init($('body'))
Carousel.init($('.wrapper'))
new NewsAjax()
