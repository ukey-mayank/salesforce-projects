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

  this.accounts = data.map(acc => ({
    ...acc,
    health: acc.activityScore >= 30 ? 'Healthy' :
            acc.activityScore >= 10 ? 'Warning' : 'Critical'
}));
}
