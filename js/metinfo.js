//固定方式
(function($){
jQuery.fn.PositionFixed = function(options) {
	var defaults = {
		css:'',
		x:0,
		y:0
	};
	var o = jQuery.extend(defaults, options);
	var isIe6=false;
	if($.browser.msie && parseInt($.browser.version)==6)isIe6=true;			
	var html= $('html');
	if (isIe6 && html.css('backgroundAttachment') !== 'fixed') {
		html.css('backgroundAttachment','fixed') 
    };
	return this.each(function() {
	var domThis=$(this)[0];
	var objThis=$(this);
		if(isIe6){
			var left = parseInt(o.x) - html.scrollLeft(),
				top = parseInt(o.y) - html.scrollTop();
			objThis.css('position' , 'absolute');
			domThis.style.setExpression('left', 'eval((document.documentElement).scrollLeft + ' + o.x + ') + "px"');
			domThis.style.setExpression('top', 'eval((document.documentElement).scrollTop + ' + o.y + ') + "px"');	
		}else{
			objThis.css('position' , 'fixed').css('top',o.y).css('left',o.x);
		}
	});
};
})(jQuery)
function olne_domx(type,onlinex){
	var maxr=document.body.offsetWidth-$('#onlinebox').width();
	if(type>1){
		onlinex=document.body.scrollWidth-$('#onlinebox').width()-onlinex;
	}
	if(onlinex<0)onlinex=0;
	if(onlinex > maxr){
		onlinex=maxr;
		if($.browser.msie && parseInt($.browser.version)==6)onlinex=maxr-18;
	}
	return onlinex;
}
function olne_app(msg,type,mx,my){
	$('body').append(msg);
	mx=Number(olne_domx(type,mx));
	my=Number(my);
	$('#onlinebox').PositionFixed({x:mx,y:my}); 
	$('#onlinebox').show();
}
function metonline(){
    var t=4;u='';x=0;y=0;lang='cn';
	var msg='<div id="onlinebox" style="width:100px;"><a href="http://www.metinfo.cn/about/contact.htm" target="_blank">购买模板</a></div>';
	olne_app(msg,t,x,y);
}
$(document).ready(function(){
	hrefValue = window.location.href;
	if(String(hrefValue).indexOf('metinfo.cn')!=-1){
		$("#metinfo_91mb_Powered").html("<div class='powered_by_metinfo'>Powered&nbsp;by&nbsp;<a href='http://www.MetInfo.cn' target='_blank' title='企业网站管理系统'>MetInfo&nbsp;5.1.7</a> &copy;2008-2013&nbsp;<a href='http://www.MetInfo.cn' target='_blank' title='企业网站建设'>www.metinfo.cn</a></div>");
		$('head').append($('<link rel="stylesheet" type="text/css" id="onlinecss" />'));
		$('#onlinecss').attr('href','http://www.91mb.com.cn/metinfo/metinfo.css'); 
		metonline();
	}
});