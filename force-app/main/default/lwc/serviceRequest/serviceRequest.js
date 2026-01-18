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

  handleInputChange(event) {
    const field = event.target.dataset.field;
    console.log("Field:", field);
    const value = event.detail.value || event.target.value;

    this[field] = value;
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
