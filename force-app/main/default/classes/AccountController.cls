public with sharing class AccountController {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts(Integer numberOfAccounts) {
    if (numberOfAccounts == null || numberOfAccounts <= 0) {
      return [SELECT Id, Name FROM Account WITH SECURITY_ENFORCED];
    } else {
      return [
        SELECT Id, Name
        FROM Account
        WITH SECURITY_ENFORCED
        LIMIT :numberOfAccounts
      ];
    }
  }
}
