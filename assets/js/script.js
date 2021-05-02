var apiKey = "&appid=53cea83d8d415de4479dc0fd3843d73c";
var city = $("#citySearch").val();
var today = moment().format("MM/DD/YY");

$('document').ready(function(){
    $('#searchBtn').click(function(){
        currentCity;
    });
    $('#citySearch').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#searchBtn').click();//Trigger search button click event
        };
    });
});



function cityHistory() {
    var listItem = $("<li>" + city + "</li>");
    listItem.attr("class", "list-group-item");
    $(".list-group").append(listItem);
};

function currentCity() {
    var city = $("#citySearch").val();
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey, function(data) {
        console.log(data);
        $("#citySearch").val("");

        var cityName = data.name;
        var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        console.log(icon)

        $(".cityNameDateIcon").append(cityName + " " + "(" + today + ")" + " ");
        $(".cityNameDateIcon").attr("src", icon);
        $(".curTemp").append("Temperature: " + data.main.temp + " °F");
        $(".curHumidity").append("Humidity: " + data.main.humidity + "%");
        $(".curWind").append("Wind Speed: " + data.wind.speed + " MPH");
        });  
        cityHistory();
}