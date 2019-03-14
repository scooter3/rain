import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Skycons from '.././skycons';

class Weather extends Component {

  // skycons = new Skycons({"color": "white"});

  // constructor() {
  //   super();
    
  // }

  getWeatherType(weatherCode) {
    switch(weatherCode){
      // thunderstorms
      case (weatherCode >= 200 && weatherCode < 300):
        return this.skycons.RAIN;
      
      // drizzle
      case(weatherCode >=300 && weatherCode < 400):
        return this.skycons.RAIN;

      // rain
      case(weatherCode >= 500 && weatherCode < 600):
        return this.skycons.RAIN;

      case(weatherCode == 611 || weatherCode == 612):
        return this.skycons.SLEET;

      case(weatherCode >= 600 && weatherCode < 700):
        return this.skycons.SNOW;
      
      case(weatherCode == 741):
        return this.skycons.FOG;

      // todo change to clear day or clear night
      case(weatherCode == 800):
        return this.skycons.CLEAR_DAY;
      
      case(weatherCode >= 801 && weatherCode < 900):
        return this.skycons.CLOUDY;
    }
  }

  render() {
    const {currentWeather} = this.props.weather;
    const location = this.props.location;
    const forecast = this.props.forecast;


    const weatherIcon = this.getWeatherType(currentWeather.weather[0].id);
    this.skycons.add(document.getElementById("icon1"), weatherIcon);
    this.skycons.play();

    // debugger;
    //&deg;F
    return (
      <div className="Weather">
        <pre>{JSON.stringify(currentWeather, null, 2)}</pre>
        <br/>
        <br/>
        <pre>{JSON.stringify(currentWeather.weather[0], null, 2)}</pre>
        <br/>
        <br/>
        <pre>{JSON.stringify(forecast, null, 2)};</pre>
      </div>
    );
  }
}

Weather.propTypes = {
  weather: PropTypes.object.isRequired
}

export default Weather;
