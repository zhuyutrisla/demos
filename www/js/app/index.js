require(['jquery','com/carousel','com/gotop','com/newsajax'], function($,Carousel, GoTop, NewsAjax){

	GoTop.init($('body'))

	Carousel.init($('.wrapper'))
	
	new NewsAjax()
})