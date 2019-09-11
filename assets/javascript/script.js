


function grabNYTimesArticles(searchQuery, numberOfRecords, beginDate, endDate) {
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
    }).then(function (data) {

        console.log(data.response)

        for (var i = 0; i < numberOfRecords; i++) {
            var url = data.response.docs[i].web_url;
            var headline = data.response.docs[i].headline.print_headline;
            var snippet = data.response.docs[i].lead_paragraph;

            if (snippet == null) {
                var snippet = data.response.docs[i].snippet;
            } var snippet = data.response.docs[i].lead_paragraph;


            if (headline == null) {
                var headline = data.response.docs[i].headline.main;
            } else {
                var headline = data.response.docs[i].headline.print_headline;
            }

            $('#results').append(`<div id="newsDiv" class="well"><h2><a href="${url}">${headline}</h2></a><br><p class='well bg-light'>${snippet}</p></div>`);
        }
    });
}

$('#searchButton').on('click', function (event) {
    event.preventDefault();

    $('#results').empty();

    var searchQueryToUse = $('#searchInput').val();
    var startYear = $('#startYear').val();
    var endYear = $('#endYear').val();
    var resultsMax = parseInt($('#disabledSelect option:selected').text(), 10);

    grabNYTimesArticles(searchQueryToUse, resultsMax, startYear, endYear);
    $('#searchInput').val("");
});

$('#clearButton').on('click', function (event) {
    event.preventDefault();

    $('#results').empty();
})

