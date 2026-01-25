import { LightningElement, wire } from "lwc";
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getQualifiedLeads from "@salesforce/apex/LeadQualificationController.getQualifiedLeads";

export default class LeadQualificationDashboard extends LightningElement {
  leads = [];
  wiredResult;
  isLoading = false;
  error;

  @wire(getQualifiedLeads)
  wiredLeads(result) {
    this.wiredResult = result;

    if (result.data) {
      this.leads = result.data.map((l) => ({
        ...l,
        status: l.score >= 80 ? "Hot" : l.score >= 50 ? "Warm" : "Cold"
      }));
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.leads = [];

      this.showToast(
        "Error",
        "Failed to load lead qualification data",
        "error"
      );
    }
  }

  handleRefresh() {
    this.isLoading = true;

    refreshApex(this.wiredResult)
      .catch(() => {
        this.showToast("Error", "Refresh failed. Please try again.", "error");
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
