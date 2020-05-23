import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Weather from "./components/Weather";
import Zip from "./components/Zip";
import geocoder from "node-geocoder";
import moment from "moment";
import { config } from "./config.js";

const DAY_FORMAT = "dddd";
const DATE_FORMAT = "M/D/YYYY";

class App extends Component {
  weatherApi = require("openweather-apis");
  weatherForecastDays = 5;

  state = {};

  constructor(props) {
    super(props);

    this.weatherApi.setLang("en");
    this.weatherApi.setUnits("imperial");
    this.weatherApi.setAPPID(config.openWeatherApiKey);
    //document.body.style.backgroundImage = "url('./images/rain.jpg')";
  }

  componentDidMount() {
    this.getDate();
    navigator.geolocation.getCurrentPosition((position) => {
      // get the city name first
      this.getCityName(position.coords.latitude, position.coords.longitude)
        .then((result) => {
          this.setState({
            location: result[0],
          });
        })
        .then(() => {
          // fetch weather data
          this.weatherApi.setZipCode(this.state.location.zipcode);

          this.getWeatherData().then((response) => {
            this.setState({
              weather: {
                currentWeather: response,
              },
            });
          });

          // fetch forecast data
          this.getForecast().then((response) => {
            this.setState({
              forecast: response,
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
      fiveDays.push(moment().add(i, "days").format("dddd"));
    }

    this.setState({
      date: {
        day: moment().format(DAY_FORMAT),
        full: moment().format(DATE_FORMAT),
        part: this.getPartOfDay(),
        fiveDays: fiveDays,
      },
    });
  }

  /**
   * Get new weather data for the given zip code.
   *
   */
  updateAll = (zipCode) => {
    // update date
    this.getDate();

    // update zip code
    this.setState({
      location: {
        zipcode: zipCode,
      },
    });

    let options = {
      provider: "google",
      apiKey: config.googleMapsApiKey,
    };

    let NodeGeocoder = require("node-geocoder");
    let geocoder = NodeGeocoder(options);

    geocoder
      .geocode({ address: zipCode })
      .then((result) => {
        this.setState({
          location: result[0],
        });
      })
      .catch((err) => {
        console.log("ERROR: " + err);
      });

    // update weather
    this.weatherApi.setZipCode(zipCode);
    this.getWeatherData().then((response) => {
      this.setState({
        weather: {
          currentWeather: response,
        },
      });
    });

    // update forecast
    this.getForecast().then((response) => {
      this.setState({
        forecast: response,
      });
    });
  };

  /**
   * Get weather data from OpenWeather.
   */
  getWeatherData = () => {
    return new Promise((resolve, reject) => {
      this.weatherApi.getAllWeather((err, JSONObj) => {
        if (err) {
          reject(err);
        }
        resolve(JSONObj);
      });
    });
  };

  /**
   * Get forecast data given zip code.
   *
   */
  getForecast = () => {
    return new Promise((resolve, reject) => {
      this.weatherApi.getWeatherForecastForDays(
        this.weatherForecastDays,
        (err, JSONObj) => {
          if (err) {
            reject(err);
          }
          resolve(JSONObj);
        }
      );
    });
  };

  /**
   * Get the city name with the given latitude and longitude.
   *
   */
  getCityName = (latitude, longitude) => {
    let options = {
      provider: "google",
      apiKey: config.googleMapsApiKey,
    };

    let NodeGeocoder = require("node-geocoder");
    let geocoder = NodeGeocoder(options);

    return geocoder
      .reverse({ lat: latitude, lon: longitude })
      .then((res) => {
        // console.log("location:" + JSON.stringify(res, null, 2));
        return res;
      })
      .catch((err) => {
        console.log(err);
      });

    // return new Promise((resolve, reject) =>{
    //   geocoder.reverse({latitude, longitude}, (err, res) => {
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
    return null;
    // return (
    //   <div>
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //     </header>
    //   </div>
    // );
  }
}

export default App;
