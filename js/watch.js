const movieData = document.getElementById('movie-data');
const input = document.getElementById('movie-search');
const key = '2fb7569a';
const defaultTitle = 'dead+poets+society';
const url = `https://www.omdbapi.com/?apikey=${key}&t=`;
const urli = `https://www.omdbapi.com/?apikey=${key}&i=`;
function movieDataTpl(movie){
  document.getElementById("playa").style.visibility = "visible"; 
  document.getElementById("movie-card").style.visibility = "visible"; 
  let actors = movie.Actors.split(',');
  $html = "";
  $html += `
    <div class="movie__poster">
      <span class="movie__poster--fill">
        <img src="${movie.Poster}" />
      </span>
      <span class="movie__poster--featured">
        <img src="${movie.Poster}" />
      </span>
    </div>
    <div class="movie__details">
      <h2 class="movie__title">${movie.Title}</h2>
      <ul class="movie__tags list--inline">
        <li class="movie__rated">${movie.Rated}</li>
        <li class="movie__year">${movie.Year}</li>
        <li class="movie__year">${movie.Genre}</li>
      </ul>
      <p class="movie__plot">${movie.Plot}</p>
      <div class="movie__credits">
        <p><strong>Written by:</strong> ${movie.Writer}</p>
        <p><strong>Directed by:</strong> ${movie.Director}</p>
        <p><strong>Starring:</strong></p>
        <ul class="movie__actors list--inline">
          ${actors.map(actor => `<li>${actor}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
  $html2 = `	
  <script async src='..js/yo.js'></script>
  <div id="yohoho" data-player="videospider" data-imdb=${movie.imdbID}></div>
  <a class="close" href="#">&times;</a>`; 
  $("#movie-data").html($html);
  $("#myPopup").html($html2);

  
};

function noResultsTpl(){
    document.getElementById("playa").style.visibility = "hidden"; 

  return `
    <div class="movie__no-results">
      <h2>No results. Please try again.</div>
    </div>
  `;
};

function findMovie(title){
  document.getElementById('movie-search').blur() 
  document.getElementById("movie-card").style.visibility = "visible"; 
  document.getElementById("result").innerHTML = "";
  fetch(url + title, {
    method: 'get',
  }).then(function(res) {
    return res.json();
  }).then(function(data) {
    movieDataTpl(data);
  }).catch(function(err) {
    movieData.innerHTML = noResultsTpl();
  });
}

function findMovieID(title){
  document.getElementById('movie-search').blur() 
  document.getElementById("movie-card").style.visibility = "visible"; 
  document.getElementById("result").innerHTML = "";
  fetch(urli + title, {
    method: 'get',
  }).then(function(res) {
    return res.json();
  }).then(function(data) {
    movieDataTpl(data);
  }).catch(function(err) {
    movieData.innerHTML = noResultsTpl();
  });
}


//findMovie(defaultTitle);

input.addEventListener('keypress', (e) => {
  if (e.keyCode === 13 && input.value) {findMovie(input.value);}
});
function searchMe(){
	 if (input.value) findMovie(input.value);
   }
//function searchToggle(obj, evt){
//    var container = $(obj).closest('.search-wrapper');
//        if(!container.hasClass('active')){
//            container.addClass('active');
//            evt.preventDefault();
//        }
//        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
//            container.removeClass('active');
//            // clear input
//            container.find('.search-input').val('');
//			document.getElementById("result").style.visibility = "hidden";
//		container.addClass('active');
//        }
//}
function stopMe(obj, evt){
    var container = $(obj).closest('.search-wrapper');
				document.getElementById("playa").style.visibility = "hidden"; 
            container.find('.search-input').val('');
					container.addClass('active');
			document.getElementById("movie-card").style.visibility = "hidden"; 
			  document.getElementById("result").innerHTML = "";


}
// js only creates and insert parts + click events adds classes

var numOfPieces = 6 * 6;

var frag = document.createDocumentFragment();

function insertInnerPieces($el, innerPieces) {
  for (var i = 0; i < innerPieces; i++) {
    var $inner = document.createElement('div');
    $inner.classList.add('popup__piece-inner');
    $el.appendChild($inner);
  }
};

for (var i = 1; i <= numOfPieces; i++) {
  var $piece = document.createElement('div');
  $piece.classList.add('popup__piece');
  
  insertInnerPieces($piece, 3);
  frag.appendChild($piece);
}

document.querySelector('.popup__pieces').appendChild(frag);

var $popupsCont = document.querySelector('.popups-cont');
var $popup = document.querySelector('.popup');
var popupAT = 900;

document.querySelector('.popup-btn').addEventListener('click', function() {
  $popupsCont.classList.add('s--popup-active');
  $popup.classList.add('s--active');
});

function closeHandler() {
$("iframe").each(function() { 
        var src= $(this).attr('src');
        $(this).attr('src',src);  
});  $popupsCont.classList.remove('s--popup-active');
  $popup.classList.remove('s--active');
  $popup.classList.add('s--closed');
  
  setTimeout(function() {
    $popup.classList.remove('s--closed');
  }, popupAT);
}
$(document).click(function(e){

    // Check if click was triggered on or within #menu_content
    if( $(e.target).closest(".search-wrapper").length > 0) {
        return false;
    }
	else if( $(e.target).closest(".section--valo").length > 0) {
	 document.getElementById("result").innerHTML = "";
    // Otherwise
    // trigger your click function
	}
});
document.querySelector('.popup__close').addEventListener('click', closeHandler);

document.querySelector('.popups-cont__overlay').addEventListener('click', closeHandler);
var $input = document.getElementById('movie-search');
var baseUrl = "https://sg.media-imdb.com/suggests/";
var $result = document.getElementById('result');
var body = document.getElementsByTagName('body');

$input.addEventListener('click', tellMe);
$input.addEventListener('keyup', tellMe);
function tellMe(){
		$input.removeEventListener('click', tellMe);

		document.getElementById("result").style.visibility = "visible"; 
		document.getElementById("movie-card").style.visibility = "hidden"; 
		document.getElementById("playa").style.visibility = "hidden"; 

	//clearing blank spaces from input
	var cleanInput = $input.value.replace(/\s/g, "");
	
	//clearing result div if the input box in empty
	if(cleanInput.length === 0) {
		$result.innerHTML = "";
	}
	
	if(cleanInput.length > 0) {
		
		var queryUrl = baseUrl + cleanInput[0].toLowerCase() + "/" 
					  + cleanInput.toLowerCase()
					  + ".json";	
		$.ajax({
		    
		    url: queryUrl,
		    dataType: 'jsonp',
		    cache: true,
		    jsonp: false,
		    jsonpCallback: "imdb$" + cleanInput.toLowerCase()
		
		}).done(function (result) {
	    	
	    	//clearing result div if there is a valid response
	    	if(result.d.length > 0) {
	    		$result.innerHTML = "";
	    	}
		    
		    for(var i = 0; i < result.d.length; i++) {
		    	
		    	var category = result.d[i].id.slice(0,2);
		    	
		    	if(category === "tt" || category === "nm") {		    		
		    		//row for risplaying one result
		    		var resultRow = document.createElement('a');
		    		resultRow.setAttribute('class', 'resultRow');
		    		var destinationUrl;

		    		if(category === "tt") {
		    			destinationUrl = "https://www.imdb.com/title/" + result.d[i].id;
		    		} else {
		    			destinationUrl = "https://www.imdb.com/name/" + result.d[i].id;
		    		}
		    		window.imid = result.d[i].id;
		    		resultRow.setAttribute('id', 'linkTo');
					resultRow.style.cursor = "pointer";
		    		resultRow.setAttribute('target', '_blank');
					resultRow.setAttribute("onclick", "findMovieID('"+result.d[i].id+"')");
		    		//creating and setting poster
		    		var poster = document.createElement('img');
		    		poster.setAttribute('class', 'poster');

		    		if(result.d[i].i) {
			    		var imdbPoster = result.d[i].i[0];
			    		imdbPoster = imdbPoster.replace("._V1_.jpg", "._V1._SX40_CR0,0,40,54_.jpg");
			    		var posterUrl = 
			    			"https://i.embed.ly/1/display/resize?key=798c38fecaca11e0ba1a4040d3dc5c07&url="
			    			+ imdbPoster
			    			+ "&height=108&width=80&errorurl=http%3A%2F%2Flalwanivikas.github.io%2Fimdb-autocomplete%2Fimg%2Fnoimage.png&grow=true"
			    		poster.setAttribute('src', posterUrl);
		    		}

		    		//creating and setting description
		    		var description = document.createElement('div');
		    		description.setAttribute('class', 'description');
					description.setAttribute('id', 'desc');
		    		var name = document.createElement('h4');
		    		var snippet = document.createElement('h5');

		    		if(category === "tt" && result.d[i].y) {
		    			name.innerHTML = result.d[i].l + " (" + result.d[i].y + ")";
		    		} else {
		    			name.innerHTML = result.d[i].l;
		    		}
		    		snippet.innerHTML = result.d[i].s;

		    		$(description).append(name);
		    		$(description).append(snippet);

		    		// $(resultRow).append(poster);
		    		$(resultRow).append(description);
					$("#result").append(resultRow);
					console.log(name)
					$input.addEventListener('click', tellMe);

		    	}
		    }
		
		});
	}
}

