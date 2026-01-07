import { LightningElement, wire } from 'lwc';
import getTasks from '@salesforce/apex/ToDoController.getTasks';

const columns = [
    {label: 'Name', fieldName: 'Name'},
    {label: 'Priority', fieldName: 'Priority__c'},
    {label: 'Status', fieldName: 'Status__c'},
]


export default class ToDoTasks extends LightningElement {
    tasks;
    error;
    columns = columns;

    @wire(getTasks)
    wiredTasks({data, error}){
        if(data){
            this.tasks = data;
            this.error = undefined;
        }else if(error){
            this.error = error;
            this.data = undefined;
        }
    }
}