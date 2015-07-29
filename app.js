$(function(){
	$('#get_instgram').on('click',function(){
		var instimg = $('#instagram_img');
		$.ajax({
			url:'https://api.instagram.com/v1/tags/lighthouse/media/recent?client_id=b694bc24aa774f7b8cb44c9450ff673f',// + access_token,
			method:'get',
			dataType:'jsonp',
			success:function(data){
				var i = 0;
			timerId = window.setInterval(function(){
			//	debugger;
				var image = data.data[i];
				$('#img_info').find('h2').text(image.caption.text);
				$('#img_info').find('a').attr("href",image.link);
			instimg.slideUp(100);
			instimg.attr("src",	image.images.standard_resolution.url);
			instimg.slideDown();
		   i++;
			if (i == 21) $('get_instgram').click();
			}, 3000);}
			});
	});

	$('#stop_timer').on('click',function(){
		window.clearInterval(timerId);
	});
});
