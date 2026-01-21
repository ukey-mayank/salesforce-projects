import { LightningElement, api } from "lwc";

export default class LdsAccount extends LightningElement {
  @api recordId;
  @api objectApiName;
  fields = ["Id", "Name", "Website", "Phone"];
}
