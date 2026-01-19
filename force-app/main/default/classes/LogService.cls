public with sharing class LogService {
  public static void persist(
    String className,
    Long executionTime,
    Map<String, Integer> limits,
    String errorMessage
  ) {
    /*Execution_Log__c log = new Execution_Log__c();
    log.Trigger_Name__c = className;
    log.Execution_Time__c = executionTime;
    log.CPU_Used__c = limits.get('CPU');
    log.SOQL_Count__c = limits.get('SOQL');
    log.DML_Count__c = limits.get('DML');
    log.Error_Message__c = errorMessage;

    insert log;*/
  }
}
