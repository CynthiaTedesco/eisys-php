function executeVideoRequest(ids) {
	//prepare the request
    var request = gapi.client.youtube.videos.list({
        part: 'snippet,statistics,contentDetails',
        id: ids,
        fields: 'items(contentDetails/duration,id,snippet(channelTitle,channelId,description,publishedAt,title),statistics/viewCount)',
        maxResults: 5
    });
    //execute the request
    request.execute(function(response){
    	var result = response.result;
    	$('div .youtube-container').html("");
    	$.each(result.items, function(index,item){
    		//console.log(item);
    		$.get('tpl/youtube-template.html', function(data){
				$('div .youtube-container').
					append(tplawesome(data, 
						[{'title':item.snippet.title,
						  'duration':formatDuration(item.contentDetails.duration),
						  'videoid':item.id,
						  'channelTitle':item.snippet.channelTitle,
                          'channelid':item.snippet.channelId,
						  'publishedAt': aLangKeys[localStorage.getItem("lang")]['publicado'] + ' ' + formatDate(item.snippet.publishedAt),
						  'description':item.snippet.description.substring(0,100)+'...',
						  'viewCount': item.statistics.viewCount + ' ' + aLangKeys[localStorage.getItem("lang")]['visitas']
						}]));
    		});
    	});
        $('div .youtube-container')
            .append('<div class="see-more"><span class="tr-as-html" key="canal"></span></div>');
    	resetVideoHeight();
    });

    $(window).on('resize', resetVideoHeight);
}

function formatDuration(d){
	d = d.replace('PT', '');
	var durationArray = [];

	if (d.indexOf('H')>-1){
		var hours = d.substring(0, d.indexOf('H'));
		hours = hours < 10 ? '0'+hours : hours;
		durationArray.push(hours);
	}
	
	if (d.indexOf('M')){
		var minutes = d.substring(d.indexOf('H')+1, d.indexOf('M'));
		minutes = minutes < 10 ? '0'+minutes : minutes;
		durationArray.push(minutes);
	}

	if (d.indexOf('S')){
		var seconds = d.substring(d.indexOf('M')+1, d.indexOf('S'));
		seconds = seconds < 10 ? '0'+seconds : seconds;
		durationArray.push(seconds);
	}

	return durationArray.join(':');
}
function formatDate(d){
	var date = new Date(d);
	return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
}
function executeSearchRequest() {
	//prepare the request
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        fields: 'items/id',
        type: 'video',
        maxResults: 5,
        channelId: 'UC0k7cSxwAvvKRUrwhC3bjQA',
        order: 'date'
    });
    //execute the request
    request.execute(function(response){
    	var result = response.result;
    	var ids = result.items.map(function(item) {return item.id.videoId;});
    	this.executeVideoRequest(ids.join());
    });
}

function resetVideoHeight(){
	$('.video').css('height',$('.video').width() * 9/16);
}
function init() {
    gapi.client.setApiKey('AIzaSyCI7HH8K8P9qnFZTPBCBH9XFrvHltrCBPs');
    gapi.client.load('youtube', 'v3', function() {
        //youtube api os ready
        executeSearchRequest();
        
    });
}
