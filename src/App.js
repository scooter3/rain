import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from './components/Weather';
import { resolve } from 'path';
import geolocation from 'html5-geolocation';

class App extends Component {

  state = {
    weather:{
      location: "02215"
    }
  };

  constructor(props) {
    super(props);
    const weatherForecastDays = 5;
  }

  componentDidMount() {
    
    this.geo = geolocation();
    this.geo.get(function(err, position) {
      if (!err) {
        console.log('Position is:', position);
      } else {
        console.log('Position unknown:', err.message);
      }
    });

    this.weather = require('openweather-apis');
    this.weather.setLang('en');
    this.weather.setZipCode(this.state.weather.location);
    this.weather.setUnits('imperial');
    this.weather.setAPPID('023b7ae0c92a6c61615c20f4da6bd7bc');

    // fetch weather data
    this.getWeatherData().then((response) => {
      //console.log(JSON.stringify(response, null, 2));
      this.setState({
        weather: {
          currentWeather: response
        }
      });
    });
    
    // this.getForecast().then((response) => {
    //   this.state.weather.forecast = response;
    // });
  }

  /**
   * Get weather data from OpenWeather
   */
  getWeatherData = () => {
    return new Promise((resolve, reject) => {
      this.weather.getAllWeather(function (err, JSONObj) {
        if(err) {
          reject(err);
        }
        resolve(JSONObj);
      });
    });
  }

  getForecast = () => {
    return new Promise((resolve, reject) => {
      this.weather.getWeatherForecastForDays(this.weatherForecastDays, function (err, JSONObj) {
        if(err) {
          reject(err);
        }
        resolve(JSONObj);
      });
    });
  }

  render() {
    if(this.state.weather.currentWeather){
      return (
        <div className="App">

          <Weather weather={this.state.weather}/>
        </div>
      );
    }
    return(
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
