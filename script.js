$(document).ready(function() {
    var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
    var FLICKR_API = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=fac284a050eaad75262c2a70be1041c6&per_page=1&format=json&nojsoncallback=1";    

// YOUTUBE
    function getYouTubeApi(searchTerm, callback) {
    var query = {
      part: 'snippet',
      key: 'AIzaSyBmZfE4yxQQQCFXws7eALM5nzMbp4uLiNU',
      q: searchTerm,
      maxResults: 1
    }
    $.getJSON(YOUTUBE_BASE_URL, query, callback);
  }
  //Showing Youtube Results
  function showYouTubeResults(data) {
    var youtubeResult='';
    
    if (data.items) {
      data.items.forEach(function(item) {
        youtubeResult += "<p><iframe height='300' width='370'" +
          "src='https://www.youtube.com/embed/" + item.id.videoId + "?controls=1'>" + "</iframe></p>"
      });
    }
    else {
      youtubeResult += '<p>No results!</p>';
    }

    $('#js-results').html(youtubeResult);
  }
  // Youtube search
  $('#js-search').submit(function() {
    event.preventDefault();
    var searchTerm = $('#js-search-input').val() + "song";         
    getYouTubeApi(searchTerm, showYouTubeResults); 

//FLICKR
    $.getJSON(FLICKR_API,function(json){
      $.each(json.photos.photo,function(i,myresult){
        apiurl_size = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=fac284a050eaad75262c2a70be1041c6&photo_id="+myresult.id+"&format=json&nojsoncallback=1";
        $.getJSON(apiurl_size,function(size){
          $.each(size.sizes.size,function(i,myresult_size){
            if(myresult_size.width < 1000){
              $(".content").css({backgroundImage: "url(" + myresult_size.source + ")"});
            }
          })
        })
      });
    });
  });
});
