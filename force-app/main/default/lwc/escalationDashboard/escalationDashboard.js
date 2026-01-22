import { LightningElement, wire } from "lwc";
import getEscalationLogs from "@salesforce/apex/CaseEscalationController.getEscalationLogs";

export default class EscalationDashboard extends LightningElement {
  logs;
  error;

  columns = [
    { label: "Case Number", fieldName: "caseNumber" },
    { label: "Old Owner", fieldName: "oldOwner" },
    { label: "New Owner", fieldName: "newOwner" },
    { label: "Reason", fieldName: "reason" },
    { label: "Date", fieldName: "createdDate", type: "date" }
  ];

  @wire(getEscalationLogs)
  wiredLogs({ error, data }) {
    if (data) {
      this.logs = data.map((row) => ({
        Id: row.Id,
        caseNumber: row.Case__r?.CaseNumber,
        oldOwner: row.Old_Owner__r?.Name,
        newOwner: row.New_Owner__r?.Name,
        reason: row.Escalation_Reason__c,
        createdDate: row.CreatedDate
      }));
      this.error = undefined;
    }

    if (error) {
      this.error = error.body.message;
      this.logs = undefined;
    }
  }

  refreshData() {
    return refreshApex(this.wiredLogs);
  }
}
