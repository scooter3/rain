import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Weather extends Component {

  // constructor() {
  //   super();
  // }

  render() {
    const {currentWeather, forecast} = this.props.weather;
    const location = this.props.location;
    // debugger;
    return (
      <div className="Weather">
        {location.city}, {location.zipcode}, {location.country}
        <br/>
        {currentWeather.weather[0].description}
        <br/>
        Current temp: {currentWeather.main.temp}&deg;F
        <br/>

      </div>
    );
  }
}

Weather.propTypes = {
  weather: PropTypes.object.isRequired
}

export default Weather;
