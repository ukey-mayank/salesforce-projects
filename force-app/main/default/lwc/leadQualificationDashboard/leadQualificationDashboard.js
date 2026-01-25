import { LightningElement, wire } from "lwc";
import getQualifiedLeads from "@salesforce/apex/LeadQualificationController.getQualifiedLeads";

export default class LeadQualificationDashboard extends LightningElement {
  leads;

  @wire(getQualifiedLeads)
  wiredLeads({ data }) {
    if (data) {
      this.leads = data;
    }
  }

  this.leads = data.map(l => ({
    ...l,
    status:
        l.score >= 80 ? 'Hot' :
        l.score >= 50 ? 'Warm' :
        'Cold'
}));
}
