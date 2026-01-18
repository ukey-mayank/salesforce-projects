public with sharing class ServiceRequestController {
  @AuraEnabled
  public static void createServiceRequestRecord(
    String subject,
    String severity,
    String type,
    String priority,
    String status
  ) {
    System.debug('Subject: ' + subject);
    System.debug('Severity: ' + severity);
    System.debug('Type: ' + type);
    System.debug('Priority: ' + priority);
    System.debug('Status: ' + status);
    try {
      Service_Request__c request = new Service_Request__c();
      request.subject__c = subject;
      request.severity__c = severity;
      request.type__c = type;
      request.priority__c = priority;
      request.status__c = status;

      insert request;
    } catch (Exception e) {
      System.debug('Error: ' + e.getMessage());
    }
  }
}
