'use strict';

//weather
const weatherApiKey = 'b44103fff3d841849ba145507201110';
const weatherSearchURL = 'https://api.weatherapi.com/v1/astronomy.json';

//params
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

//API fetch
function getWeather(queryCity, queryState) {
  const query = queryCity + "," + queryState;
  const params = {
    key: weatherApiKey,
    q: query
  };
  
  const queryString = formatQueryParams(params);
  const url = weatherSearchURL + '?' + queryString;
  
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      };
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayWeather(responseJson))
    .catch((error) => {
      $("#js-error-message").text(`Something went wrong: ${error.message}`);
  });
}

//Display weather
function displayWeather(responseJson) {
  $('.results-time').empty();
      $('.results-time').append(`
        <h2>Photoshoot in: ${responseJson.location.name} ${$('#state').val()}</h2>
        <br>
        <hr>
        <h3>The sunset time is: ${responseJson.astronomy.astro.sunset}</h3>
        <hr>
        <br>
        <p>Let's meet <b><em>3 hours before</em></b> so we have lots of time for our photoshoot!</p>
    `);
    $('#js-error-message').empty();
    $('#results-time').removeClass('hidden');
    getLocation(`${responseJson.location.lat}`, `${responseJson.location.lon}`);
}

//Submit button
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const city = $('#city').val();
    const state = $('#state').val();
    getWeather(city, state);
  });
}

$(watchForm);