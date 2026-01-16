import { LightningElement } from "lwc";
import getWeatherData from "@salesforce/apex/WeatherService.getWeatherData";

const weatherOptions = [
  { label: "Current", value: "current" },
  { label: "Hostical", value: "historical" },
  { label: "Forecast", value: "forecast" }
];

export default class WeatherService extends LightningElement {
  currentCity = "Nagpur";
  country;
  timezone_id;
  observation_time;
  temperature;
  weather_description;
  sunrise;
  sunset;
  pm2_5;
  wind_speed;
  pressure;
  humidity;
  visibility;
  is_day;
  weatherOptions = weatherOptions;
  selectedType = "current";

  handleInputChange(event) {
    this.currentCity = event.target.value;
  }

  handleChange(event) {
    this.selectedType = event.detail.value;
  }

  handleBtnClick() {
    getWeatherData({
      location: this.currentCity,
      dataType: this.selectedType
    })
      .then((res) => {
        this.currentCity = res.name;
        this.country = res.country;
        this.timezone_id = res.timezone_id;
        this.observation_time = res.observation_time;
        this.temperature = res.temperature;
        this.weather_description = res.weather_description;
        this.sunrise = res.sunrise;
        this.sunset = res.sunset;
        this.pm2_5 = res.pm2_5;
        this.wind_speed = res.wind_speed;
        this.pressure = res.pressure;
        this.humidity = res.humidity;
        this.visibility = res.visibility;
        this.is_day = res.is_day;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
