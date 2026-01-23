/**
 * @description
 * Service class to evaluate Opportunity health
 * based on metadata-driven rules
 */
public with sharing class OpportunityHealthService {
  /**
   * Result wrapper returned to caller
   */
  public class HealthResult {
    public String status;
    public String reason;

    public HealthResult(String status, String reason) {
      this.status = status;
      this.reason = reason;
    }
  }

  /**
   * Evaluate health for a given Opportunity
   */
  public static HealthResult evaluate(
    Opportunity opp,
    List<Opportunity_Health_Rule__mdt> rules
  ) {
    if (opp == null || rules == null || rules.isEmpty()) {
      return new HealthResult(
        'Unknown',
        'Insufficient data to evaluate health'
      );
    }

    Integer daysOpen = Date.today().daysBetween(opp.CreatedDate.date());

    for (Opportunity_Health_Rule__mdt rule : rules) {
      // Stage match
      if (rule.Stage__c != opp.StageName) {
        continue;
      }

      // Amount check
      if (rule.Min_Amount__c != null && opp.Amount < rule.Min_Amount__c) {
        return new HealthResult(
          rule.Health_Status__c,
          'Amount below minimum threshold'
        );
      }

      // SLA (days open) check
      if (rule.Max_Days_Open__c != null && daysOpen > rule.Max_Days_Open__c) {
        return new HealthResult(
          rule.Health_Status__c,
          'Opportunity open beyond SLA'
        );
      }
    }

    // Default healthy state
    return new HealthResult('Healthy', 'Opportunity meets all health criteria');
  }
}
