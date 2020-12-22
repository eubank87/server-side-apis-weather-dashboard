
// on click event that reads search input for api calls & creates new buttons for past searches.
// TODO: save past searches in local storage
$("button").on("click", function(){
    // create variable to read search input as a value to use in api search
    event.preventDefault()
    var searchInput = $("#search-input").val()
    localStorage.setItem("city", searchInput)

    // dynamically creating new button in html with same class as hard coded btn
    var newButton = $("<button>").addClass("btn")
    newButton.addClass("btn-secondary").text(searchInput);
    $("#past-search-buttons").prepend(newButton);

    // first url used for current weather info
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=f4aa00bd0357d60904e18da5d680e490&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // once ajax call returns info, html elements are dynamically created with new class info and text from api 
    .then(function(response){
        var card = $("<div>").addClass("card")
        var city = $("<h1>").addClass("card-text").text(response.name)
        var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " F");
        var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + " %");
        var wind = $("<p>").addClass("card-text").text("Wind: " + response.wind.speed + " MPH");
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        img.attr("alt", "weather icon")
        var cardBody = $("<div>").addClass("card-body-2");
        city.append(img);
        cardBody.append(city, temp, humidity, wind);
        card.append(cardBody);
        $(".jumbotron").append(card);
    })
    // empty contents of jumbotron so new search does not stack 
    $(".jumbotron").empty();

    // second ajax call for 5 day forecast
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=f4aa00bd0357d60904e18da5d680e490&units=imperial"
    $.ajax({
        url: queryURL2,
        method: "GET"
    })
    .then(function(response){
        // created for loop to run through array of 5 day forecast and only pull/print info from 12:00pm
        for(var i = 0; i<response.list.length; i++){
            if(response.list[i].dt_txt.indexOf("12:00:00")!== -1){
                var card = $("<div>").addClass("card2");
                var date = $("<h6>").addClass("card2").text(response.list[i].dt_txt)
                var img = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather.icon + ".png");
                img.attr("alt", "weather icon")
                var temp = $("<p>").addClass("card-text2").text("Temp: " + response.list[i].main.temp + " F");
                var humidity = $("<p>").addClass("card-text2").text("Humidity: " + response.list[i].main.humidity + "%");
                var cardBody = $("<div>").addClass("card-body");
                var col = $("<div>").addClass("col-md-2");
                cardBody.append(date, temp, img, humidity);
                card.append(cardBody);
                col.append(card)
                $("#upcoming-display").append(col);
            }
        }
    })
    // empty contents of 5 day cards in bewteen searches
    $("#upcoming-display").empty();

    // third api call for uv index- currently using hard coded lat/lon. TODO: Need to figure out a way to change input
    var queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=47.61&lon=-122.33&appid=f4aa00bd0357d60904e18da5d680e490"
    $.ajax({
        url: queryURL3,
        method: "GET"
    })
    .then(function(response){
        var uvIndex = $("<p>").addClass("card-text").text("UV Index: " + response.value);
        $(".card-body-2").append(uvIndex);
    });
});