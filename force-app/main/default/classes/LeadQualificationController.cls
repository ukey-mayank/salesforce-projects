public with sharing class LeadQualificationController {
  @AuraEnabled(cacheable=true)
  public static List<LeadWrapper> getQualifiedLeads() {
    List<LeadWrapper> results = new List<LeadWrapper>();

    List<Lead> leads = [
      SELECT Id, Name, Email, Phone, Company, OwnerId, LastActivityDate
      FROM Lead
      LIMIT 20
    ];

    for (Lead l : leads) {
      Integer score = 0;

      if (l.Email != null)
        score += 20;
      if (l.Phone != null)
        score += 20;
      if (l.Company != null)
        score += 20;
      if (l.OwnerId != null)
        score += 20;
      if (
        l.LastActivityDate != null &&
        l.LastActivityDate >= System.today().addDays(-30)
      ) {
        score += 20;
      }

      results.add(new LeadWrapper(l.Id, l.Name, score));
    }

    return results;
  }

  public class LeadWrapper {
    @AuraEnabled
    public Id id;
    @AuraEnabled
    public String name;
    @AuraEnabled
    public Integer score;

    public LeadWrapper(Id id, String name, Integer score) {
      this.id = id;
      this.name = name;
      this.score = score;
    }
  }
}
