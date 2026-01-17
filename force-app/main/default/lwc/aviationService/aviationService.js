import { LightningElement } from "lwc";
import getAviationData from "@salesforce/apex/AviationService.getAviationData";

export default class AviationService extends LightningElement {
  limit = 10;
  isLoading = false;
  aviationData = [];

  handleInputChange(event) {
    this.limit = event.target.value;
  }

  getFlightData() {
    this.isLoading = true;
    getAviationData({ flightLimit: this.limit })
      .then((res) => {
        console.log("Result: ", res);
        this.aviationData = res;
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
