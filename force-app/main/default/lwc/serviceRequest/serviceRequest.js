import { LightningElement } from "lwc";
import createServiceRequestRecord from "@salesforce/apex/ServiceRequestController.createServiceRequestRecord";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import {
  SEVERITY_OPTIONS,
  TYPE_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS
} from "c/serviceRequestConfig";

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

  get comboData() {
    return [
      {
        label: "Severity",
        placeholder: "Select severity",
        data_field: "selectedSeverity",
        value: this.formData.selectedSeverity,
        options: this.severityOptions,
        className: "slds-m-around_medium"
      },

      {
        label: "Type",
        placeholder: "Select type",
        data_field: "selectedType",
        value: this.formData.selectedType,
        options: this.typeOptions,
        className: "slds-m-around_medium"
      },

      {
        label: "Priority",
        placeholder: "Select priority",
        data_field: "selectedPriority",
        value: this.formData.selectedPriority,
        options: this.priorityOptions,
        className: "slds-m-around_medium"
      },

      {
        label: "Status",
        placeholder: "Select status",
        data_field: "selectedStatus",
        value: this.formData.selectedStatus,
        options: this.statusOptions,
        className: "slds-m-around_medium"
      }
    ];
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
