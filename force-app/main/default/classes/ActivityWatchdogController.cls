public with sharing class ActivityWatchdogController {
  @AuraEnabled(cacheable=true)
  public static List<AccountActivityWrapper> getAccountActivity() {
    List<AccountActivityWrapper> results = new List<AccountActivityWrapper>();

    List<Account> accounts = [
      SELECT
        Id,
        Name,
        (
          SELECT Id, ActivityDate
          FROM Tasks
          WHERE ActivityDate = LAST_N_DAYS:30
        ),
        (
          SELECT Id, ActivityDate
          FROM Events
          WHERE ActivityDate >= LAST_N_DAYS:30
        )
      FROM Account
      LIMIT 10
    ];

    for (Account acc : accounts) {
      Integer score = 0;
      score += acc.Tasks.size() * 5;
      score += acc.Events.size() * 5;

      results.add(new AccountActivityWrapper(acc.Name, score));
    }
    return results;
  }

  public class AccountActivityWrapper {
    @AuraEnabled
    public String accountName;
    @AuraEnabled
    public Integer activityScore;

    public AccountActivityWrapper(String name, Integer score) {
      this.accountName = name;
      this.activityScore = score;
    }
  }
}
