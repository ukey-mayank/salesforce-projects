import { LightningElement } from "lwc";
import validateEmail from "@salesforce/apex/ContactValidator.validateEmail";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class SmartContactCreator extends LightningElement {
  handleSubmit(event) {
    event.preventDefault();
    const fields = event.detail.fields;

    validateEmail({ email: fields.Email })
      .then(() => {
        this.template.querySelector("lightning-record-form").submit(fields);
      })
      .catch((error) => {
        this.showToastEvent("Validation Error", error.body.message, "error");
      });
  }

  handleSuccess() {
    this.showToastEvent("Success", "Contact created successfully", "success");
  }
  handleError(event) {
    this.showToastEvent("Error", event.detail.message, "error");
  }

  showToastEvent(title, message, variant) {
    this.dispatchEvent(new ShowToastEvent(title, message, variant));
  }
}
