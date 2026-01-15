import { LightningElement } from "lwc";
import getWeatherData from "@salesforce/apex/WeatherService.getWeatherData";

const weatherOptions = [
  { label: "Current", value: "current" },
  { label: "Hostical", value: "historical" },
  { label: "Forecast", value: "forecast" }
];

export default class WeatherService extends LightningElement {
  currentCity = "Nagpur";
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
        console.log("Result: ", res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
