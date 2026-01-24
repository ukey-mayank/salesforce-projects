import { LightningElement, wire } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getAccountActivity from "@salesforce/apex/ActivityWatchdogController.getAccountActivity";

export default class ActivityWatchdog extends LightningElement {
  accounts = [];
  wiredResult;
  isLoading = false;

  @wire(getAccountActivity)
  wiredAccounts(result) {
    this.wiredResult = result;

    if (result.data) {
      this.accounts = result.data.map((acc) => ({
        ...acc,
        health:
          acc.activityScore >= 30
            ? "Healthy"
            : acc.activityScore >= 10
              ? "Warning"
              : "Critical"
      }));
    }
  }

  handleRefresh() {
    this.isLoading = true;

    refreshApex(this.wiredResult).finally(() => {
      this.isLoading = false;
    });
  }
}
