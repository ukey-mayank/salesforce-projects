import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";

export default class ParentComponent extends LightningElement {
  numberOfAccounts = 0;
  accounts = [];
  @wire(getAccounts, { numberOfAccounts: "$numberOfAccounts" })
  wiredAccounts({ data, error }) {
    if (data) {
      this.accounts = data;
      this.error = undefined;
      const event = new ShowToastEvent({
        title: "Success",
        message: this.numberOfAccounts + " Accounts fetched successfully",
        variant: "success"
      });
      this.dispatchEvent(event);
    } else if (error) {
      this.error = error;
      this.data = undefined;
    }
  }

  handleAccountInputChange(event) {
    this.numberOfAccounts = event.detail.value;
  }
}
