'use strict';

//tripadvisor
const tripApiKey = '1e2a47b176msh6edd229e299a040p145bd7jsn81af7043ea6d';
const tripSearchURL = 'https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng';

//API fetch
function getLocation(latitude, longitude) {
    const params = {
        latitude: latitude,
        longitude: longitude,
        limit: 30,
        distance: 10, 
        lunit: 'mi'
    }
  const queryString = formatQueryParams(params);
  const url = tripSearchURL + '?' + queryString;

  const options = {
    headers: new Headers({
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": tripApiKey,
      "useQueryString": true
    })
  };
  
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayLocation(responseJson))
    .catch((error) => {
      $("#js-error-message").text(`Something went wrong: ${error.message}`);
  });
}

function displayLocation(responseJson) {
    $('.results-location').empty();

    let placeName = '';
    let placeAddress = '';
    let placeRating = '';
    let placeRanking = '';
    for (let i = 0; i < responseJson.data.length; i++) {
      if (responseJson.data[i].rating >= 5) {
        placeName = responseJson.data[i].name;
        placeAddress = responseJson.data[i].address;
        placeRating = responseJson.data[i].rating;
        placeRanking = responseJson.data[i].ranking_position;
      } 
    };
    $('.results-location').append(`
      <h2>Let's meet at:</h2>
      <h3>${placeName}</h3>
      <br>
      <p>${placeAddress}</p>
      <p>Nice Rating: ${placeRating} out of 5</p>
      `);
    $('#js-error-message').empty();
    $('#results-location').removeClass('hidden');
}