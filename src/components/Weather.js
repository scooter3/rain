import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Skycons} from '.././skycons';

class Weather extends Component {

  skycons = new Skycons({"color": "white"});

  getWeatherType(weatherCode, partOfDay) {
    const x = weatherCode;

    switch(true){
      // thunderstorms
      case (x >= 200 && x < 300):
        return Skycons.RAIN;
      
      // drizzle
      case(x >=300 && x < 400):
        return Skycons.RAIN;

      // rain
      case(x >= 500 && x < 600):
        return Skycons.RAIN;

      case(x === 611 || x === 612):
        return Skycons.SLEET;

      case(x >= 600 && x < 700):
        return Skycons.SNOW;
      
      case(x === 741):
        return Skycons.FOG;

      case(x === 800 && (partOfDay === 'afternoon' || partOfDay === 'morning')):
        return Skycons.CLEAR_DAY;

      case(x === 800 && partOfDay === 'evening'):
        return Skycons.CLEAR_NIGHT;
      
      case(x >= 801 && x < 900):
        return Skycons.CLOUDY;

      default:
        return;
    }
  }

  createForecast() {

  }

  render() {
    const {currentWeather} = this.props.weather;
    const {location, date, forecast} = this.props;
    const weatherIcon = this.getWeatherType(currentWeather.weather[0].id, date.part);

    this.skycons.set(document.getElementById("icon1"), weatherIcon);
    this.skycons.play();

    return (
      <div className="Weather">
        <h1>{location.city}, {location.administrativeLevels.level1short}</h1>
        <h1>{currentWeather.main.temp}&deg; F</h1>
        <h2>{date.day}</h2>
        <h2>{date.full}</h2>
        <br/>
        <ul>
          {forecast.list.map(function(value, index) {
            return <li>
              High: {value.temp.max}<br/>
              Low: {value.temp.min}<br/>
              {value.weather[0].main}<br/><br/>
            </li>
          })}
        </ul>
        <pre>{JSON.stringify(currentWeather, null, 2)}</pre>
        <br/>
        <br/>
        <pre>{JSON.stringify(currentWeather.weather[0], null, 2)}</pre>
        <br/>
        <br/>
        <pre>{JSON.stringify(forecast, null, 2)}</pre>
      </div>
    );
  }
}

Weather.propTypes = {
  weather: PropTypes.object.isRequired,
  forecast: PropTypes.object.isRequired
}

export default Weather;
