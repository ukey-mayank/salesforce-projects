import { LightningElement } from "lwc";
import getWeatherData from "@salesforce/apex/WeatherService.getWeatherData";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const WEATHER_OPTIONS = [
  { label: "Current", value: "current" },
  { label: "Historical", value: "historical" },
  { label: "Forecast", value: "forecast" }
];

export default class WeatherService extends LightningElement {
  currentCity = "Nagpur";
  weatherOptions = WEATHER_OPTIONS;
  selectedType = "current";
  weather;
  isLoading = false;

  get weatherFields() {
    if (!this.weather) return [];

    return [
      { key: "city", label: "City", value: this.weather.name },
      { key: "country", label: "Country", value: this.weather.country },
      { key: "timezone", label: "Timezone", value: this.weather.timezone_id },
      {
        key: "observation",
        label: "Observation",
        value: this.weather.observation_time
      },
      {
        key: "temperature",
        label: "Temperature",
        value: this.weather.temperature
      },
      {
        key: "weather_desc",
        label: "Weather Description",
        value: this.weather.weather_description
      },
      {
        key: "sunrise",
        label: "Sunrise",
        value: this.weather.sunrise
      },
      { key: "sunset", label: "Sunset", value: this.weather.sunset },
      { key: "pm2_5", label: "Air Quality", value: this.weather.pm2_5 },
      {
        key: "wind_speed",
        label: "Wind Speed",
        value: this.weather.wind_speed
      },
      { key: "pressure", label: "Pressure", value: this.weather.pressure },
      { key: "humidity", label: "Humidity", value: this.weather.humidity },
      {
        key: "visibility",
        label: "Visibility",
        value: this.weather.visibility
      },
      { key: "is_day", label: "Is Day?", value: this.weather.is_day }
    ];
  }

  handleInputChange(event) {
    this.currentCity = event.target.value;
  }

  handleChange(event) {
    this.selectedType = event.detail.value;
  }

  handleBtnClick() {
    this.isLoading = true;
    getWeatherData({
      location: this.currentCity,
      dataType: this.selectedType
    })
      .then((res) => {
        this.weather = res;
      })
      .catch((error) => {
        this.showToast("Error", "Weather Service Failed", error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  showToast(title, message, variant) {
    this.dispatchEvent(
      new ShowToastEvent({
        title,
        message,
        variant
      })
    );
  }
}
