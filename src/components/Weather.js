import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Skycons} from '.././skycons';
import moment from 'moment';

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

      // check for 804 (overcast clouds) first because it has a unique icon
      case(x === 804):
        return Skycons.CLOUDY;
      
      case((x >= 801 && x < 900) && (partOfDay === 'afternoon' || partOfDay === 'morning')):
        return Skycons.PARTLY_CLOUDY_DAY;

      case((x >= 801 && x < 900) && partOfDay === 'evening'):
        return Skycons.PARTLY_CLOUDY_NIGHT;

      default:
        return;
    }
  }

  render() {
    const {currentWeather} = this.props.weather;
    const {location, date, forecast} = this.props;
    let moment = require("moment");
    
    forecast.list.forEach((element) => {
      this.forecastIcons.push(this.getWeatherType(element.weather[0].id));
    });
    
    return (
      <div className="Weather">

        <div id="mainWeatherArea">

          <div class="weatherColumn">
            <div id="mainWeatherIconBox"><canvas id="mainWeatherIcon" width="128" height="128" title={currentWeather.weather[0].main}></canvas></div>
          </div>

          <div class="weatherColumn">
            <div id="mainTemp">{Number.parseFloat(currentWeather.main.temp).toFixed(0)}&deg;</div>
            <div id="highLow">
              H {Number.parseFloat(currentWeather.main.temp_max).toFixed(0)}&deg; L {Number.parseFloat(currentWeather.main.temp_min).toFixed(0)}&deg;
            </div>
          </div>

          <div class="weatherColumn">
            <div id="info">
              <div id="cityState">{location.city}, {location.administrativeLevels.level1short}</div>
              <div id="date">{date.day} {date.full}</div>
              <div id="time">as of {moment.unix(currentWeather.dt).format("h:mm A")}</div>
            </div>

            <div id="otherWeatherData">
              <p>
                Humidity: {currentWeather.main.humidity}% <br />
                Pressure: {Number.parseFloat(currentWeather.main.pressure * 0.0145037738).toFixed(2)} in<br />
                Wind Speed: {currentWeather.wind.speed} MPH <br />
                Sun: {moment.unix(currentWeather.sys.sunrise).format("h:mm A")} | {moment.unix(currentWeather.sys.sunset).format("h:mm A")}
              </p>
            </div>
          </div>

        </div>

          {forecast.list.map(function(value, index) {
            return (
              <div id="forecastTable">
                <div class="forecastDay">{date.fiveDays[index]}</div>
                <div class="forecastIcon"><canvas width="30" height="30" id={"forecast" + index} title={value.weather[0].main}></canvas></div>
                <div class="forecastTemp">{Number.parseFloat(value.temp.max).toFixed(0)}&deg; | {Number.parseFloat(value.temp.min).toFixed(0)}&deg;</div>
                {/* <div>{value.weather[0].main}</div> */}
                
              </div>
            )
          })}
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
