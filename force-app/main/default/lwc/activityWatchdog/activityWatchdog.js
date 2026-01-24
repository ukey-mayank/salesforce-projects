import { LightningElement, wire } from "lwc";
import getAccountActivity from "@salesforce/apex/ActivityWatchdogController.getAccountActivity";

export default class ActivityWatchdog extends LightningElement {
  accounts;

  @wire(getAccountActivity)
  wiredAccounts({ data, error }) {
    if (data) {
      this.accounts = data;
    }
  }
}
