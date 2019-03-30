import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Skycons} from '.././skycons';

class Weather extends Component {

  constructor(props) {
    super(props);
    this.forecastIcons = [];
    this.skycons = new Skycons({"color": "white"});
  }

  componentDidMount() {
    // Render main weather icon
    const {currentWeather} = this.props.weather;
    const {date} = this.props;
    const weatherIcon = this.getWeatherType(currentWeather.weather[0].id, date.part);

    this.skycons.set(document.getElementById("mainWeatherIcon"), weatherIcon);
    this.skycons.play();

    // Render forecast icons
    for(let i=0; i < 5; i++) {
      this.skycons.set(document.getElementById("forecast" + i), this.forecastIcons[i])
    }
  }

  getWeatherType(weatherCode, partOfDay = 'morning') {
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

  render() {
    const {currentWeather} = this.props.weather;
    const {location, date, forecast} = this.props;
    
    forecast.list.forEach((element) => {
      this.forecastIcons.push(this.getWeatherType(element.weather[0].id));
    });
    
    return (
      <div className="Weather">
        <canvas id="mainWeatherIcon" width="128" height="128"></canvas>
        <h1>{location.city}, {location.administrativeLevels.level1short}</h1>
        <h1>{currentWeather.main.temp}&deg; F</h1>
        <h2>{date.day}</h2>
        <h2>{date.full}</h2>
        <br/>
        <table id="forecastTable">
        <tbody>
          {forecast.list.map(function(value, index) {
            return (
              <tr key={index}>
                <td>{date.fiveDays[index]}</td>
                <td>{Number.parseFloat(value.temp.max).toFixed(0)} | {Number.parseFloat(value.temp.min).toFixed(0)}</td>
                <td>{value.weather[0].main}</td>
                <td><canvas width="30" height="30" id={"forecast" + index}></canvas></td>
              </tr>
            )
          })}
          </tbody>
          </table>
        {/* <pre>{JSON.stringify(currentWeather, null, 2)}</pre>
        <br/>
        <br/>
        <pre>{JSON.stringify(currentWeather.weather[0], null, 2)}</pre>
        <br/>
        <br/>
        <pre>{JSON.stringify(forecast, null, 2)}</pre> */}
      </div>
    );
  }
}

Weather.propTypes = {
  weather: PropTypes.object.isRequired,
  forecast: PropTypes.object.isRequired
}

export default Weather;
