import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Weather extends Component {

  // constructor() {
  //   super();
  // }

  render() {
    const {location, currentWeather, forecast} = this.props.weather;
    // debugger;
    return (
      <div className="Weather">
        {currentWeather.name}
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
