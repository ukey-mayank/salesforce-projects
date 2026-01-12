import { LightningElement, wire } from 'lwc';
import getAccountHealth from '@salesforce/apex/AccountHealthController.getAccountHealth';

export default class AccountHealthTracker extends LightningElement {

    accounts = [];
    filteredAccounts = [];
    selectedFilter = 'All';

    filterOptions = [
        { label: 'All', value: 'All' },
        { label: 'Healthy', value: 'Healthy' },
        { label: 'Warning', value: 'Warning' },
        { label: 'Critical', value: 'Critical' }
    ];

    @wire(getAccountHealth)
    wiredData({ data, error }) {
        if (data) {
            this.accounts = data.map(acc => ({
                ...acc,
                badgeClass: this.getBadgeClass(acc.healthScore),
                status: this.getStatus(acc.healthScore)
            }));
            this.filteredAccounts = this.accounts;
        }
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

    handleFilterChange(event) {
        this.selectedFilter = event.detail.value;

        if (this.selectedFilter === 'All') {
            this.filteredAccounts = this.accounts;
        } else {
            this.filteredAccounts = this.accounts.filter(
                acc => acc.status === this.selectedFilter
            );
        }
    }
}