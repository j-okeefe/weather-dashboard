var apiKey = '&appid=53cea83d8d415de4479dc0fd3843d73c'
var city = $('#citySearch').val()
var today = moment().format('MM/DD/YY')

// clicking search button provides results
$('document').ready(function () {
  $('#searchBtn').click(currentCity);
  $('#searchBtn').click(cityForecast);
})

// adds searched city to list
function cityHistory() {
  var listItem = $('<li>' + city + '</li>')
  listItem.attr('class', 'list-group-item')
  $('.list-group').append(listItem)
}

// pulls current weather and appends to HTML
function currentCity() {
  var city = $('#citySearch').val()
  $.getJSON(
    'https://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&units=imperial' +
      apiKey,
    function (data) {
      console.log(data)
      $('#citySearch').val('')

      var cityName = data.name
      var temp = Math.floor(data.main.temp)
      var humidity = data.main.humidity;
      var wind = Math.floor(data.wind.speed)
      var icon =
        'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png'
      console.log(icon)

      $('.cityNameDateIcon').append(cityName + ' ' + '(' + today + ')' + ' ')
      $('.curIcon').attr('src', icon)
      $('.curTemp').append('Temperature: ' + temp + ' °F')
      $('.curHumidity').append('Humidity: ' + humidity + '%')
      $('.curWind').append('Wind Speed: ' + wind + ' MPH')
    },
  )

  // uvIndex(data.coord.lon, data.coord.lat)
}

// sets UV Index
function uvIndex(ln, lt) {
  $.getJSON(
    'https://api.openweathermap.org/data/2.5/uvi?appid=' +
      apiKey +
      '&lat=' +
      lt +
      '&lon=' +
      ln,
    function (data) {
      console.log(data)
      $('.curUV').append('UV Index: ' + data.value)
    },
  )
}

// pulls 5-day forecast and appends to HTML
function cityForecast() {
  var city = $('#citySearch').val()
  $.getJSON(
    'https://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&units=imperial' +
      apiKey,
    function (data) {
      console.log(data)

      for (i = 0; i < 5; i++) {
        var date = moment().add(1, 'days').format('MM/DD/YY');
        var iconId = data.weather[0].icon;
        var icon = 'https://openweathermap.org/img/w/' + iconId + '.png';
        var temp = Math.floor(data.main.temp); 
        var humidity = data.main.humidity;

        $(".date"+i).append(date);
        $(".icon"+i).append("<img src="+icon+">");
        $(".temp"+i).append(temp);
        $(".humid"+i).append(humidity+"%");
      };
    });
};
