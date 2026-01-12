public with sharing class AccountHealthController {

    @AuraEnabled(cacheable=true)
    public static List<AccountWrapper> getAccountHealth() {

        List<AccountWrapper> results = new List<AccountWrapper>();

        for(Account acc : [
            SELECT Id, Name,
            (SELECT Id FROM Opportunities WHERE IsClosed = false),
            (SELECT Id FROM Cases WHERE Status != 'Closed'),
            LastModifiedDate
            FROM Account
            LIMIT 10
        ]) {

            Integer score = 100;

            score -= acc.Opportunities.size() * 10;
            score -= acc.Cases.size() * 5;

            if(acc.LastModifiedDate < System.now().addDays(-30)){
                score -= 10;
            }

            results.add(new AccountWrapper(acc.Name, score));
        }
        return results;
    }

    public class AccountWrapper {
        @AuraEnabled public String name;
        @AuraEnabled public Integer healthScore;

        public AccountWrapper(String name, Integer score){
            this.name = name;
            this.healthScore = score;
        }
    }
}