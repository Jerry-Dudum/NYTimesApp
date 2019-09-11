// Event listener of id of cat-button
$("#search-button").on("click", function (event) {
    event.preventDefault();
    var search = $("#search-input").val().trim();
    var start = $("#start-input").val().trim();
    var end = $("#end-input").val().trim();
    var numberOfRecords = $("#number-input").val().trim();
    // An URL string assigned to queryURL
    if (start === "" && end === "") {
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&api-key=Y8Pp6fak747GzhErHVymE1ceC4GIzjox";

    }
    else {
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + "&api-key=Y8Pp6fak747GzhErHVymE1ceC4GIzjox&facet_fields=source&facet=true&begin_date=" + start + "&end_date=" + end;
    }
    // AJAX method that requests to queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // the response is got upon request
        .then(function (response) {
            console.log(response);
            var articles = response.response.docs;

            // console.log(articles[4]);
            for (var i = 0; i < numberOfRecords; i++) {
                console.log(articles[i].headline.print_headline);
                console.log(articles[i].snippet);
                console.log(articles[i].byline.original);
                var newDiv = $("<div>");
                newDiv.addClass("article");
                var headline = articles[i].headline.print_headline;
                var snippet = articles[i].snippet;
                var original = articles[i].byline.original;
                var link = articles[i].web_url;

                newDiv.append("<p>" + headline + " " + original + "</p>");
                newDiv.append("<p>" + snippet + "</p>");
                newDiv.append($("<a>").attr("href", link).text("Go To Article"));
                newDiv.append("<hr>");

                $("#articles").prepend(newDiv);

            }
            $("#clear-button").on("click", function () {

                $("#search-input").val("");
                $("#number-input").val("");
                $("#start-input").val("");
                $("#end-input").val("");
                $("#articles").empty();
            });

        });
});



