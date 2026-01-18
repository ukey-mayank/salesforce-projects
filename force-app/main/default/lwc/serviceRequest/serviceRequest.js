import { LightningElement } from "lwc";
import createServiceRequestRecord from "@salesforce/apex/ServiceRequestController.createServiceRequestRecord";

const SEVERITY_OPTIONS = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" }
];
const TYPE_OPTIONS = [
  { label: "Hardware", value: "hardware" },
  { label: "Software", value: "software" }
];
const PRIORITY_OPTIONS = [
  { label: "Urgent", value: "urgent" },
  { label: "Normal", value: "normal" },
  { label: "Calm", value: "calm" }
];
const STATUS_OPTIONS = [
  { label: "New", value: "new" },
  { label: "In Progress", value: "inProgress" },
  { label: "Completed", value: "completed" }
];
export default class ServiceRequest extends LightningElement {
  severityOptions = SEVERITY_OPTIONS;
  typeOptions = TYPE_OPTIONS;
  priorityOptions = PRIORITY_OPTIONS;
  statusOptions = STATUS_OPTIONS;

  selectedSeverity;
  selectedType;
  selectedPriority;
  selectedStatus;

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
      severity: this.selectedSeverity,
      type: this.selectedType,
      priority: this.selectedPriority,
      status: this.selectedStatus
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
