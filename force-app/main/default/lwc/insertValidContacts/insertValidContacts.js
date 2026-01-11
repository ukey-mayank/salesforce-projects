import { LightningElement, wire } from 'lwc';
import getComboboxAccounts from '@salesforce/apex/AccountController.getComboboxAccounts';

export default class InsertValidContacts extends LightningElement {
    accounts = []
    selectedAccountId
    error
    isDisabled = true

    @wire(getComboboxAccounts)
    wiredAccounts({data, error}){
        if(data){
            this.accounts = data.map(acc => ({
                label : acc.Name,
                value: acc.Id 
            }))
        }else if(error){
            console.error(error)
        }
    }

    handleComboChange(event){
        this.selectedAccountId = event.detail.value;
        this.isDisabled = false
    }
}