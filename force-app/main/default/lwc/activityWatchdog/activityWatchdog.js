import { LightningElement, wire } from "lwc";
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getAccountActivity from "@salesforce/apex/ActivityWatchdogController.getAccountActivity";

export default class ActivityWatchdog extends LightningElement {
  accounts = [];
  wiredResult;
  isLoading = false;
  error;

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
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.accounts = [];
      this.showToast("Error", "Failed to load account activity data", "error");
    }
  }

  handleRefresh() {
    this.isLoading = true;

    refreshApex(this.wiredResult)
      .catch(() => {
        this.showToast("Error", "Refresh failed", "error");
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
