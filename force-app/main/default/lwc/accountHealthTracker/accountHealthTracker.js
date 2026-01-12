import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAccountHealth from '@salesforce/apex/AccountHealthController.getAccountHealth';

export default class AccountHealthTracker extends LightningElement {

    accounts = [];
    filteredAccounts = [];
    wiredResult;
    isLoading = false;

    @wire(getAccountHealth)
    wiredData(result) {
        this.wiredResult = result;

        if (result.data) {
            this.accounts = result.data.map(acc => ({
                ...acc,
                badgeClass: this.getBadgeClass(acc.healthScore),
                status: this.getStatus(acc.healthScore)
            }));
            this.filteredAccounts = this.accounts;
        }
    }

    handleRefresh() {
        this.isLoading = true;

        refreshApex(this.wiredResult)
            .finally(() => {
                this.isLoading = false;
            });
    }

    getBadgeClass(score) {
        if (score >= 80) return 'slds-theme_success';
        if (score >= 50) return 'slds-theme_warning';
        return 'slds-theme_error';
    }

    getStatus(score) {
        if (score >= 80) return 'Healthy';
        if (score >= 50) return 'Warning';
        return 'Critical';
    }
}