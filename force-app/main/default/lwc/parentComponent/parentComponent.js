import { LightningElement, wire } from "lwc";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";

export default class ParentComponent extends LightningElement {
  numberOfAccounts = 0;
  accounts = [];
  @wire(getAccounts, { numberOfAccounts: "$numberOfAccounts" })
  wiredAccounts({ data, error }) {
    if (data) {
      this.accounts = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.data = undefined;
    }
  }

  handleAccountInputChange(event) {
    this.numberOfAccounts = event.detail.value;
  }
}
