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

  formData = {
    subject: "",
    selectedSeverity: "",
    selectedType: "",
    selectedPriority: "",
    selectedStatus: ""
  };

  handleInputChange(event) {
    const field = event.target.dataset.field;
    const value = event.detail.value || event.target.value;

    this.formData = { ...this.formData, [field]: value };
  }

  resetForm() {
    this.formData = {
      subject: "",
      selectedSeverity: "",
      selectedType: "",
      selectedPriority: "",
      selectedStatus: ""
    };
  }

  // it handles the event from button
  createServiceRequest() {
    createServiceRequestRecord({
      subject: this.formData.subject,
      severity: this.formData.selectedSeverity,
      type: this.formData.selectedType,
      priority: this.formData.selectedPriority,
      status: this.formData.selectedStatus
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
      })
      .finally(() => {
        this.resetForm();
      });
  }

  get isDisabled() {
    return !(
      this.formData.subject &&
      this.formData.selectedSeverity &&
      this.formData.selectedType &&
      this.formData.selectedPriority &&
      this.formData.selectedStatus
    );
  }
}
