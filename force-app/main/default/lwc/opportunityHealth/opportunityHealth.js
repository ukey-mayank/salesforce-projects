import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

// Opportunity fields
import STAGE_FIELD from "@salesforce/schema/Opportunity.StageName";
import AMOUNT_FIELD from "@salesforce/schema/Opportunity.Amount";
import CREATEDDATE_FIELD from "@salesforce/schema/Opportunity.CreatedDate";

const FIELDS = [STAGE_FIELD, AMOUNT_FIELD, CREATEDDATE_FIELD];

export default class OpportunityHealth extends LightningElement {
  @api recordId;

  opportunity;
  error;

  healthStatus = "Not Evaluated";

  // LDS usage
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

  // getters for UI
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
    return this.healthStatus === "Healthy"
      ? "slds-badge_success"
      : "slds-badge_inverse";
  }
}
