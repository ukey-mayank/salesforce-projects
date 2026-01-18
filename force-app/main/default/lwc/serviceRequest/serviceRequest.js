import { LightningElement } from "lwc";
import createServiceRequestRecord from "@salesforce/apex/ServiceRequestController.createServiceRequestRecord";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const SEVERITY_OPTIONS = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" }
];
const TYPE_OPTIONS = [
  { label: "Hardware", value: "Hardware" },
  { label: "Software", value: "Software" }
];
const PRIORITY_OPTIONS = [
  { label: "Urgent", value: "Urgent" },
  { label: "Normal", value: "Normal" },
  { label: "Calm", value: "Calm" }
];
const STATUS_OPTIONS = [
  { label: "New", value: "New" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" }
];
export default class ServiceRequest extends LightningElement {
  severityOptions = SEVERITY_OPTIONS;
  typeOptions = TYPE_OPTIONS;
  priorityOptions = PRIORITY_OPTIONS;
  statusOptions = STATUS_OPTIONS;

  subject;
  selectedSeverity;
  selectedType;
  selectedPriority;
  selectedStatus;

  handleSubjectChange(event) {
    this.subject = event.target.value;
  }

  // severity change handler
  handleSeverityChange(event) {
    this.selectedSeverity = event.detail.value;
  }

  // type change handler
  handleTypeChange(event) {
    this.selectedType = event.detail.value;
  }

  // priority change handler
  handlePriorityChange(event) {
    this.selectedPriority = event.detail.value;
  }

  // status change handler
  handleStatusChange(event) {
    this.selectedStatus = event.detail.value;
  }

  // it handles the event from button
  createServiceRequest() {
    createServiceRequestRecord({
      subject: this.subject,
      severity: this.selectedSeverity,
      type: this.selectedType,
      priority: this.selectedPriority,
      status: this.selectedStatus
    })
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            type: "success",
            title: "Success",
            message: "Service Request created successfully"
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
