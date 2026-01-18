public with sharing class ServiceRequestController {
  @AuraEnabled
  public static void createServiceRequestRecord(
    String severity,
    String type,
    String priority,
    String status
  ) {
    try {
      Service_Request__c request = new Service_Request__c();
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
