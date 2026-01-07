import { LightningElement, wire } from 'lwc';
import getCompletedTasks from '@salesforce/apex/ToDoController.getCompletedTasks'

const columns = [
    {label:'Name', fieldName: 'Name'},
    {label: 'Status', fieldName:'Status__c'},
    {label: 'Priority', fieldName:'Priority__c'}
]

export default class CompletedTasks extends LightningElement {
    completedTasks
    error

    columns = columns

    @wire(getCompletedTasks)
    wiredTasks({data, error}){
        if(data){
            console.log('Completed Tasks Data: ', data);
            this.completedTasks = data
            this.error = undefined
        }else if(error){
            this.error = error
            this.completedTasks = undefined
        }
    }
}