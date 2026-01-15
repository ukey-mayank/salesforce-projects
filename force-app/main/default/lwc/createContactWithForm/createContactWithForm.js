import { LightningElement } from "lwc";

export default class CreateContactWithForm extends LightningElement {
  inputData = [
    {
      Id: "1",
      type: "text",
      label: "Enter First Name",
      classList: "slds-var-m-around_medium slds-var-p-horizontal_small"
    },
    {
      Id: "2",
      type: "text",
      label: "Enter Last Name",
      classList: "slds-var-m-around_medium slds-var-p-horizontal_small"
    },
    {
      Id: "3",
      type: "email",
      label: "Enter Email",
      classList: "slds-var-m-around_medium slds-var-p-horizontal_small"
    },
    {
      Id: "4",
      type: "tel",
      label: "Enter Phone Number",
      classList: "slds-var-m-around_medium slds-var-p-horizontal_small"
    },
    {
      Id: "5",
      type: "text",
      label: "Enter More Details about Yourself",
      classList: "slds-var-m-around_medium slds-var-p-horizontal_small"
    }
  ];
}
