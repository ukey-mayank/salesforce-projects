public with sharing class CaseEscalationController {
  @AuraEnabled(cacheable=true)
  public static List<Escalation_Log__c> getEscalationLogs() {
    return [
      SELECT
        Id,
        Case__r.CaseNumber,
        Old_Owner__r.Name,
        New_Owner__r.Name,
        Escalation_Reason__c,
        CreatedDate
      FROM Escalation_Log__c
      ORDER BY CreatedDate DESC
      LIMIT 50
    ];
  }
}
