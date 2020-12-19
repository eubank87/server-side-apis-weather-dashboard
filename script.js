// 16 day:
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchInput + "&cnt=6&appid=f4aa00bd0357d60904e18da5d680e490&units=imperial"

$("#search-button").on("click", function(){
    // console.log(this);
    event.preventDefault()
    var searchInput = $("#search-input").val()
    console.log(searchInput)

    var newButton = $("<button>").addClass("btn")
    newButton.addClass("btn-secondary").text(searchInput);
    $("#past-search-buttons").prepend(newButton);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=f4aa00bd0357d60904e18da5d680e490&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // then today's weather is displayed on the jumbotron
    .then(function(response){
        // console.log(response);
        var card = $("<div>").addClass("card")
        var city = $("<h1>").addClass("card-text").text(response.name)
        var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " F");
        var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + " %");
        var wind = $("<p>").addClass("card-text").text("Wind: " + response.wind.speed + " MPH");
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        var cardBody = $("<div>").addClass("card-body");
        city.append(img);
        cardBody.append(city, temp, humidity, wind);
        card.append(cardBody);
        $(".jumbotron").append(card);
    })

    $(".jumbotron").empty();

    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=f4aa00bd0357d60904e18da5d680e490&units=imperial"
    $.ajax({
        url: queryURL2,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        for(var i = 0; i<response.list.length; i++){
            if(response.list[i].dt_txt.indexOf("12:00:00")!== -1){
                var card = $("<div>").addClass("card");
                var date = $("<h6>").addClass("card").text(response.list[i].dt_txt)
                // var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather.icon + ".png");
                var temp = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp + " F");
                var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity + "%");
                var cardBody = $("<div>").addClass("card-body");
                var col = $("<div>").addClass("col-md-2");
                cardBody.append(date, temp, humidity);
                card.append(cardBody);
                col.append(card)
                $("#upcoming-display").append(col);
            }
        }
    })

    $("#upcoming-display").empty();

    var queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=47.61&lon=-122.33&appid=f4aa00bd0357d60904e18da5d680e490"
    $.ajax({
        url: queryURL3,
        method: "GET"
    })
    .then(function(response){
        // console.log(response);
        var uvIndex = $("<p>").addClass("card-text").text("UV Index: " + response.value);
        $(".card-body").append(uvIndex);
    });

});

// 2 more ajax calls, uv index & 5 day forecast
// uv index call done based on lattitude/longtitude. Use starting poit(Seattle) to get reference for lat/long
// take out hard coded forecast in html, leave empty div for dynamilcally built html pieces of cards
// in the 5 day forecast call, target specific times of day
// when a new search is performed, the data from the current search is stored locally
// new search results dispplay on jumbotron/cards