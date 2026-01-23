import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

// Apex
import evaluateHealth from "@salesforce/apex/OpportunityHealthController.evaluateHealth";

// Fields
import STAGE_FIELD from "@salesforce/schema/Opportunity.StageName";
import AMOUNT_FIELD from "@salesforce/schema/Opportunity.Amount";
import CREATEDDATE_FIELD from "@salesforce/schema/Opportunity.CreatedDate";

const FIELDS = [STAGE_FIELD, AMOUNT_FIELD, CREATEDDATE_FIELD];

export default class OpportunityHealth extends LightningElement {
  @api recordId;

  opportunity;
  error;
  isLoading = false;

  healthStatus = "Not Evaluated";
  healthReason;

  // LDS
  @wire(getRecord, {
    recordId: "$recordId",
    fields: FIELDS
  })
  wiredOpportunity({ error, data }) {
    if (data) {
      this.opportunity = data;
      this.error = undefined;
    } else if (error) {
      this.error = error.body.message;
      this.opportunity = undefined;
    }
  }

  // UI getters
  get stage() {
    return this.opportunity?.fields.StageName.value;
  }

  get amount() {
    return this.opportunity?.fields.Amount.value;
  }

  get createdDate() {
    return this.opportunity?.fields.CreatedDate.value;
  }

  get healthClass() {
    switch (this.healthStatus) {
      case "Healthy":
        return "slds-badge_success";
      case "At Risk":
        return "slds-badge_warning";
      case "Critical":
        return "slds-badge_error";
      default:
        return "slds-badge_inverse";
    }
  }

  // Imperative Apex call
  handleEvaluate() {
    this.isLoading = true;

    evaluateHealth({ opportunityId: this.recordId })
      .then((result) => {
        this.healthStatus = result.status;
        this.healthReason = result.reason;

        this.dispatchEvent(
          new ShowToastEvent({
            title: "Health Evaluated",
            message: result.reason,
            variant: "success"
          })
        );
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error",
            message: error.body.message,
            variant: "error"
          })
        );
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
