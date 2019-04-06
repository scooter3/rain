import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Weather from "./components/Weather";
import Zip from "./components/Zip";
import { resolve } from "path";
import geocoder from "node-geocoder";
import moment from "moment";

const DAY_FORMAT = "dddd";
const DATE_FORMAT = "M/D/YYYY";

class App extends Component {
  state = {};
  //weatherForecastDays;

  constructor(props) {
    super(props);
    this.weatherForecastDays = 5;
    this.weather = require("openweather-apis");
    this.weather.setLang("en");
    this.weather.setUnits("imperial");
    this.weather.setAPPID("023b7ae0c92a6c61615c20f4da6bd7bc");
    document.body.style.backgroundImage = "url('images/day.jpg')";
  }

  componentDidMount() {
    this.getDate();
    navigator.geolocation.getCurrentPosition(position => {
      this.getCityName(position.coords.latitude, position.coords.longitude)
        .then(result => {
          this.setState({
            location: result[0]
          });
        })
        .then(() => {
          this.weather.setZipCode(this.state.location.zipcode);
          // fetch weather data
          this.getWeatherData().then(response => {
            console.log(JSON.stringify(response, null, 2));
            this.setState({
              weather: {
                currentWeather: response
              }
            });
          });

          // fetch forecast data
          this.getForecast().then(response => {
            this.setState({
              forecast: response
            });
          });
        });
    });
  }

  /**
   * Get the current date.
   *
   */
  getDate() {
    let moment = require("moment");
    let fiveDays = [];
    for (let i = 1; i < 6; i++) {
      fiveDays.push(
        moment()
          .add(i, "days")
          .format("dddd")
      );
    }

    this.setState({
      date: {
        day: moment().format(DAY_FORMAT),
        full: moment().format(DATE_FORMAT),
        part: this.getPartOfDay(),
        fiveDays: fiveDays
      }
    });
  }

  /**
   * Get new weather data for the given zip code.
   *
   */
  updateAll = zipCode => {
    // update date
    this.getDate();

    // update zip code
    this.setState({
      location: {
        zipcode: zipCode
      }
    });

    let options = {
      provider: "google",
      apiKey: "AIzaSyAw1EtkHq0MX94gs2NKqGjxNCHpxyy5Pu0"
    };

    let NodeGeocoder = require("node-geocoder");
    let geocoder = NodeGeocoder(options);

    geocoder
      .geocode({ address: zipCode })
      .then(result => {
        this.setState({
          location: result[0]
        });
      })
      .catch(err => {
        console.log("ERROR: " + err);
      });

    // update weather
    this.weather.setZipCode(zipCode);
    this.getWeatherData().then(response => {
      this.setState({
        weather: {
          currentWeather: response
        }
      });
    });

    // update forecast
    this.getForecast().then(response => {
      this.setState({
        forecast: response
      });
    });
  };

  /**
   * Get weather data from OpenWeather.
   */
  getWeatherData = () => {
    return new Promise((resolve, reject) => {
      this.weather.getAllWeather(function(err, JSONObj) {
        if (err) {
          reject(err);
        }
        //console.log(JSONObj);
        resolve(JSONObj);
      });
    });
  };

  /**
   * Get forecast data given zip code.
   *
   */
  getForecast = zipCode => {
    return new Promise((resolve, reject) => {
      this.weather.getWeatherForecastForDays(this.weatherForecastDays, function(
        err,
        JSONObj
      ) {
        if (err) {
          reject(err);
        }
        resolve(JSONObj);
      });
    });
  };

  /**
   * Get the city name with the given latitude and longitude.
   *
   */
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
        // console.log("location:" + JSON.stringify(res, null, 2));
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

  /**
   * Determine part of the day given the time (day or night)
   *
   */
  getPartOfDay = () => {
    let moment = require("moment");
    let m = moment();
    let partOfDay;

    if (!m || !m.isValid()) {
      return;
    } //if we can't find a valid or filled moment, we return.

    var split_afternoon = 12; //24hr time to split the afternoon
    var split_evening = 15; //24hr time to split the evening
    var currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      partOfDay = "afternoon";
    } else if (currentHour >= split_evening) {
      partOfDay = "evening";
    } else {
      partOfDay = "morning";
    }

    return partOfDay;
  };

  render() {
    if (this.state.weather && this.state.forecast) {
      return (
        <div className="App">
          {/* <Zip updateAll={this.updateAll}></Zip> */}
          <Weather
            weather={this.state.weather}
            location={this.state.location}
            forecast={this.state.forecast}
            date={this.state.date}
          />
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
