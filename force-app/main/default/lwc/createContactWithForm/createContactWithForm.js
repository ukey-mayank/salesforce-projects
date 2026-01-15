import { LightningElement } from "lwc";
import createContact from "@salesforce/apex/ContactController.createContact";

export default class CreateContactWithForm extends LightningElement {
  inputData = [
    {
      Id: "1",
      type: "text",
      label: "Enter First Name",
      classList: "slds-var-m-around_medium slds-var-p-horizontal_small",
      defaultValue: ""
    },
    {
      Id: "2",
      type: "text",
      label: "Enter Last Name",
      classList: "slds-var-m-around_medium slds-var-p-horizontal_small",
      defaultValue: ""
    },
    {
      Id: "3",
      type: "email",
      label: "Enter Email",
      classList: "slds-var-m-around_medium slds-var-p-horizontal_small",
      defaultValue: "example@gmail.com"
    },
    {
      Id: "4",
      type: "tel",
      label: "Enter Phone Number",
      classList: "slds-var-m-around_medium slds-var-p-horizontal_small",
      defaultValue: "000-0000-000"
    },
    {
      Id: "5",
      type: "text",
      label: "Enter More Details about Yourself",
      classList: "slds-var-m-around_medium slds-var-p-horizontal_small",
      defaultValue: ""
    }
  ];

  handleInputChange(event) {
    const fieldId = event.target.dataset.id;
    const fieldValue = event.target.value;

    this.inputData = this.inputData.map((item) => {
      if (item.Id === fieldId) {
        return { ...item, defaultValue: fieldValue };
      }
      return item;
    });
  }

  handleBtnClick() {
    const firstName = this.inputData[0].defaultValue;
    const lastName = this.inputData[1].defaultValue;
    const email = this.inputData[2].defaultValue;
    const phone = this.inputData[3].defaultValue;
    const description = this.inputData[4].defaultValue;
    createContact({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      description: description
    })
      .then((result) => {
        console.log("Contact Created: ", result);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
}
