


function grabNYTimesArticles(searchQuery, numberOfRecords, beginDate, endDate){
    console.log('grabbing new york times articles');
    
    var queryURL;
    if (beginDate !== '' && endDate !== '') {

        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchQuery + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api-key=v9ZuAGpf5SLtPeFaivEQF3WEYT4taWAx";
    }
    else if (beginDate !== '') {
        
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchQuery + "&begin_date=" + beginDate + "&api-key=v9ZuAGpf5SLtPeFaivEQF3WEYT4taWAx";
    }
    else if (endDate !== '') {
        
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchQuery + "&end_date=" + endDate + "&api-key=v9ZuAGpf5SLtPeFaivEQF3WEYT4taWAx";
    }
    else {
        
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchQuery + "&api-key=v9ZuAGpf5SLtPeFaivEQF3WEYT4taWAx";
    }
    
    $.ajax({
        url: queryURL,
    }).then(function(data){

        for (var i = 0; i < numberOfRecords; i++) {
            var url = data.response.docs[i].web_url;
            var snippet = data.response.docs[i].snippet;

            $('#results').append(`<p><a href="${url}">${snippet}</a></p>`);
        }
    });
}

$('#searchButton').on('click', function(event){
    event.preventDefault();

    var searchQueryToUse = $('#searchInput').val();
    var startYear = $('#startYear').val();
    var endYear = $('#endYear').val();
    var resultsMax = parseInt($('#disabledSelect option:selected').text(), 10);

    grabNYTimesArticles(searchQueryToUse, resultsMax, startYear, endYear);
});

$('#clearButton').on('click', function(event){
    event.preventDefault();

    $("#clearButton").empty();
})