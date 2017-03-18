var currentResults= [];
var currentResultsIndex = 0;

function prepareSearch() {
	$("#controls").hide();
	$("#loading-overlay").show();
	var query = $("#search").val();
	if ($.trim(query) != "") {
		search(query);
		$("#search").blur();
	}
}

function search(query) {
	var api_url = "https://abakus-api-dot-sinuous-tine-156112.appspot.com/"
	var api_key = "ba2179ed-1744-445e-b5ce-c4ff0f016410" // Technically not a good idea putting this here, but let's keep this simple, shall we?
	var url = api_url + api_key + '/search'
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify({ query: query }),
		contentType: "application/json",
		dataType: "json",
		success: function (result) {
			showResults(query, result.results)
		}
	});	
}

function showResults(query, results) {
	if (results.length > 0) {
		$("#search-results").show();
		$("#no-search-results").hide();
		$("#result-number-total").html(results.length);
		$("#result-number-current").html(1);
		currentResultsIndex = 0;
		currentResults = results;
		
		$("#frames").html("");
		for (var i = 0; i < results.length; i++) {
			var onload = i == 0 ? "onload=\"deactivateLoading()\"" : "";
			$("#frames").append('<iframe id="frame' + i + '" class="frame hidden-frame" src="' + results[i].url + '" scrolling="no" ' + onload + '"></iframe>');
		}
		updateFrame(results[0].title, results[0].url);
	}
	else {
		$("#no-search-results").html("No results for \"" + query + "\".");
		$("#search-results").hide();
		$("#no-search-results").show();
	}
}

function deactivateLoading() {
	$("#controls").show();
	$("#loading-overlay").hide();
}

function nextResult(){
	currentResultsIndex = (currentResultsIndex + 1) % currentResults.length;
	updateFrame(currentResults[currentResultsIndex].title, currentResults[currentResultsIndex].url);
}

function prevResult(){
	currentResultsIndex = currentResultsIndex == 0 ? currentResults.length - 1 : currentResultsIndex - 1;
	updateFrame(currentResults[currentResultsIndex].title, currentResults[currentResultsIndex].url);
}

function updateFrame (title, url) {
	$("#site-title").html(title);
	$("#site-title").attr("href", url);
	$(".active-frame").hide();
	$("#frame" + currentResultsIndex).addClass("active-frame").show();
	$("#result-number-current").html(currentResultsIndex+1);
	$("#frame-overlay").attr("href", url);
	$("#frame-overlay").attr("title", url);
}

function openCurrentSearchResult() {
	document.getElementById("frame-overlay").click();
}

$(document).keydown(function(e) {
	var keycode = e.which;
    if (keycode == 13) {
		if ($("#search").is(":focus")) 
			prepareSearch();
		else if($("#search-results").is(":visible"))
			openCurrentSearchResult();
	}
	
	if ($("#search").is(":focus") || !$("#search-results").is(":visible"))
		return;
	
	if (keycode == 37) {
		e.preventDefault();
		prevResult();
	}
	else if (keycode == 39) {
		e.preventDefault();
		nextResult();
	}
});