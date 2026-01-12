import { LightningElement, wire } from 'lwc';
import getAccountHealth from '@salesforce/apex/AccountHealthController.getAccountHealth';

export default class AccountHealthTracker extends LightningElement {

    accounts = [];

    @wire(getAccountHealth)
    wiredData({ data, error }) {
        if (data) {
            this.accounts = data.map(acc => ({
                ...acc,
                badgeClass: this.getBadgeClass(acc.healthScore)
            }));
        } else if (error) {
            console.error(error);
        }
    }

    getBadgeClass(score) {
        if (score >= 80) return 'slds-theme_success';
        if (score >= 50) return 'slds-theme_warning';
        return 'slds-theme_error';
    }
}