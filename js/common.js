
$(function(){

	//自动加载css文件
	var index = getCookie("linkcssValue");
        var url   = './';
	if(index==null){
		index = 0;//未获取到cookie，则默认设置为0
	}
	$('#linkcss').attr('href',url+'css/style'+index+'.css');
	
	//换肤
	$('.skin b').each(function(index){
		$(this).click(function(){
			$('#linkcss').attr('href',url+'css/style'+index+'.css');
			setCookie('linkcssValue',index,30);
			
		})
	})
	
	//about leftli切换
	$('.aboutLeft li').each(function(index){
		if(index<=($('.aboutLeft li').length-1)/2){
			$(this).css('padding-left',index+'em');
		}else{
			$(this).css('padding-left',$('.aboutLeft li').length-1-index+'em');
		}
		$(this).click(function(){
			$(this).find('a').addClass('on').end().siblings().find('a').removeClass('on');
			$('.aboutRight div').eq(index).show().siblings().hide();
		})
	})
	//works scroll
	var $oLi=$('.ul1 li:eq(0)');
	var timer = null;
	var count = 0;
	var sp = 8;
	var iW=$oLi.width()+parseInt($oLi.css('padding-left'));
	$('.ul1').width(iW*$('.ul1 li').length);
	$('.ul1 img').each(function(index){
		$(this).click(function(){
			$('.bigBox img').attr('src',$(this).attr('src')).attr('title',$(this).attr('alt')+'，点击进入');
			$('.bigBox a').attr('href',$(this).attr('data-src'));
		})
	})
	$('.a1').click(function(){				
		fnMove(-1);		
	});
	$('.a2').click(function(){		
		fnMove(1);
	});
	function fnMove(n){
		count += n;
		if(count < 0 || count > $('.ul1 li').length-4){
			count = count < 0 ? 0 : $('.ul1 li').length - 4;
			return;
		}		
		clearInterval(timer);
		timer = setInterval(function(){
			var iLeft = parseInt($('.ul1').css('left')) + sp*(-n);
			if( (n < 0 && iLeft >= -iW * count) || (n > 0 && iLeft <= -iW * count) ){
				iLeft = -iW * count;
				clearInterval(timer);	
			}
			$('.ul1').css('left',iLeft);		
		},30);	
	}

	//照片轮播
	var winH=$(window).height();
	var winW=$(window).width();
	var bodH=$('body').height();
	var UA = navigator.userAgent;
	isIE = UA.indexOf('MSIE') > -1;
	var v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
	$.extend({
	   max: function(a, b){return a > b?a:b; } 
	});
	$('.totalImg').html($('.travelPhotos li').length);
	var num=0;
	$('.travelPhotos li').each(function(index){
		$(this).click(function(){
		num=index;
		$('#bigDiv,.bigImg').show();
		$('.bigImg img').attr('src',$(this).find('img').attr('src'));
		$('.bigImg strong').html($(this).find('img').attr('alt'));
		$('.curImg').html(index+1);
		$('#bigDiv').height($.max(winH,bodH));
		$('.bigImg').css({
			'top':(winH-$('.bigImg').height())/2,
			'left':(winW-$('.bigImg').width())/2
		})
		if(v<7){
			$('.bigImg').css({
				'top':(winH-$('.bigImg').height())/2+$(window).scrollTop(),
				'left':(winW-$('.bigImg').width())/2+$(window).scrollLeft()
			})
			$(window).scroll(function(){
				$('.bigImg').css({
					'top':(winH-$('.bigImg').height())/2+$(window).scrollTop(),
					'left':(winW-$('.bigImg').width())/2+$(window).scrollLeft()
				})
			})
		}
	})
	})
	$('.next').click(function(){
		num++;
		if(num>=$('.travelPhotos li').length-1){
			num=$('.travelPhotos li').length-1;
		}
		if($('.travelPhotos li').eq(num).find('img').attr('src')=='images/onload.gif'){
			$('.bigImg img').attr('src',$('.travelPhotos li').eq(num).find('img').attr('original-src'));
		}else{
			$('.bigImg img').attr('src',$('.travelPhotos li').eq(num).find('img').attr('src'));
		}
		$('.bigImg strong').html($('.travelPhotos li').eq(num).find('img').attr('alt'));
		$('.curImg').html(num+1);
	})
	$('.prev').click(function(){
		num--;
		if(num<=0){
			num=0;
		}
		$('.bigImg img').attr('src',$('.travelPhotos li').eq(num).find('img').attr('src'));
		$('.bigImg strong').html($('.travelPhotos li').eq(num).find('img').attr('alt'));
		$('.curImg').html(num+1);
	})
	$('.closeBtn').click(function(){
		$('#bigDiv,.bigImg').hide();
	})
	//时间轴
	$('.lifeYear h2').click(function(){
		$(this).siblings('.lifeList').slideToggle();
		$(this).find('i').toggleClass('packup');
	})

})
//图片按需加载
imgShow();
$(window).scroll(function(){imgShow();});
function imgShow(){
	$('.travelPhotos img').each(function(index){
		if((getTop($(this)) < $(window).height()+$(window).scrollTop())){
			if($(this).attr('original-src') != ''){
				$(this).attr('src',$(this).attr('original-src')).removeAttr('original-src');
			}else{
				$(this).attr('src','images/nofind.jpg');
			}
		}
	})
}
function getTop(obj){
	var iTop=0;
	iTop+=obj.offset().top;
	return iTop;
}


//写cookies
function setCookie(c_name, value, expiredays){
 　　　　var exdate=new Date();
　　　　exdate.setDate(exdate.getDate() + expiredays);
　　　　document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
 　　}
 
//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return (arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}