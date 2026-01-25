import { LightningElement, wire } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getQualifiedLeads from "@salesforce/apex/LeadQualificationController.getQualifiedLeads";

export default class LeadQualificationDashboard extends LightningElement {
  leads = [];
  wiredResult;
  isLoading = false;

  @wire(getQualifiedLeads)
  wiredLeads(result) {
    this.wiredResult = result;

    if (result.data) {
      this.leads = result.data.map((l) => ({
        ...l,
        status: l.score >= 80 ? "Hot" : l.score >= 50 ? "Warm" : "Cold"
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
