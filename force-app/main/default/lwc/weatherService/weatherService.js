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
