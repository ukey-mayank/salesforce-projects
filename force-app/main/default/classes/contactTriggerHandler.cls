public with sharing class contactTriggerHandler {
    public static void handleBeforeInsertUpdate(List<Contact> conList, Map<Id, Contact> oldContactsMap){
        if(conList == null){
            return;
        }
        // insert scenario
        else if(oldContactMap == null){
            Set<Id> accountIds = [SELECT AccountId FROM Contact WHERE Id IN :conList];
            Map<Id, Account> accList = [SELECT Id, Website__c FROM Account WHERE Id IN :accountIds];
            for(Contact con : conList){
                if(con.Email__c != null){
                    String emailDomain = con.Email__c.subString('@')[1];
                    if(!accList.get(con.AccountId).Website__c.contains(emailDomain)){
                        con.Email__c.addError('Email domain does not match Account Website Domain');
                    }
                }
            }
        }
    }
}