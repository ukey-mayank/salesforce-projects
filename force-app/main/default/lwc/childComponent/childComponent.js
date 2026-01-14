import { LightningElement, api, wire } from "lwc";
import getContactsFromAccountId from "@salesforce/apex/ContactController.getContactsFromAccountId";

const columns = [
  { label: "Id", fieldName: "Id" },
  { label: "Last Name", fieldName: "LastName" }
];

export default class ChildComponent extends LightningElement {
  @api parentName;
  @api accountId;
  columns = columns;
  contacts = [];

  @wire(getContactsFromAccountId, { accountId: "$accountId" })
  wiredContacts({ data, error }) {
    if (data) {
      this.contacts = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.data = undefined;
    }
  }
}
