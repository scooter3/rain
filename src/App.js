import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Weather from "./components/Weather";
import { resolve } from "path";
import geocoder from "node-geocoder";

class App extends Component {
  state = {};
<<<<<<< HEAD
  //weatherForecastDays;
=======
>>>>>>> a1abfec4f055295351ec75cd5daa158402070715

  constructor(props) {
    console.log("constructor");
    super(props);
<<<<<<< HEAD
    this.weatherForecastDays = 5;
  }

  componentDidMount() {
=======
    const weatherForecastDays = 5;
  }

  componentDidMount() {
    console.log("component did mount");
>>>>>>> a1abfec4f055295351ec75cd5daa158402070715
    navigator.geolocation.getCurrentPosition(position => {
      this.getCityName(
        position.coords.latitude,
        position.coords.longitude
      ).then(result => {
        this.setState({
          location: result[0]
        });
      }).then(() => {
        this.weather = require("openweather-apis");
        this.weather.setLang("en");
        this.weather.setZipCode(this.state.location.zipcode);
        this.weather.setUnits("imperial");
        this.weather.setAPPID("023b7ae0c92a6c61615c20f4da6bd7bc");
    
        // fetch weather data
        this.getWeatherData().then(response => {
          //console.log(JSON.stringify(response, null, 2));
          this.setState({
            weather: {
              currentWeather: response
            }
          });
        });
    
<<<<<<< HEAD
        // fetch forecast data
        this.getForecast().then((response) => {
          this.setState({
            forecast: response
          });
        });
=======
        // this.getForecast().then((response) => {
        //   this.state.weather.forecast = response;
        // });
>>>>>>> a1abfec4f055295351ec75cd5daa158402070715
      });
    });

  }

  /**
   * Get weather data from OpenWeather
   */
  getWeatherData = () => {
    return new Promise((resolve, reject) => {
      this.weather.getAllWeather(function(err, JSONObj) {
        if (err) {
          reject(err);
        }
        console.log(JSONObj);
        resolve(JSONObj);
      });
    });
  };

  getForecast = () => {
    return new Promise((resolve, reject) => {
      this.weather.getWeatherForecastForDays(this.weatherForecastDays, function(
        err,
        JSONObj
      ) {
        if (err) {
          reject(err);
        }
        console.log(JSONObj);
        resolve(JSONObj);
      });
    });
  };

  getCityName = (latitude, longitude) => {
    let options = {
      provider: "google",
      apiKey: "AIzaSyAw1EtkHq0MX94gs2NKqGjxNCHpxyy5Pu0"
    };

    let NodeGeocoder = require("node-geocoder");
    let geocoder = NodeGeocoder(options);

    return geocoder
      .reverse({ lat: latitude, lon: longitude })
      .then(function(res) {
<<<<<<< HEAD
        //console.log(res);
=======
        console.log(res);
>>>>>>> a1abfec4f055295351ec75cd5daa158402070715
        return res;
      })
      .catch(function(err) {
        console.log(err);
      });

    // return new Promise((resolve, reject) =>{
    //   geocoder.reverse({latitude, longitude}, function(err, res) {
    //     if(err) {
    //       reject(err);
    //     }
    //     resolve(res);
    //   });
    // })
  };

  render() {
<<<<<<< HEAD
    if (this.state.weather && this.state.forecast) {
      return (
        <div className="App">
          <Weather weather={this.state.weather} location={this.state.location} forecast={this.state.forecast}/>
=======
    if (this.state.weather) {
      return (
        <div className="App">
          <Weather weather={this.state.weather} location={this.state.location} />
>>>>>>> a1abfec4f055295351ec75cd5daa158402070715
        </div>
      );
    }
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
