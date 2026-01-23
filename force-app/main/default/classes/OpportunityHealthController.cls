/**
 * @description
 * Apex controller for Opportunity Health LWC
 */
public with sharing class OpportunityHealthController {
  /**
   * DTO returned to LWC
   */
  public class HealthResponse {
    @AuraEnabled
    public String status;
    @AuraEnabled
    public String reason;

    public HealthResponse(String status, String reason) {
      this.status = status;
      this.reason = reason;
    }
  }

  /**
   * Imperative call from LWC to evaluate health
   */
  @AuraEnabled
  public static HealthResponse evaluateHealth(Id opportunityId) {
    if (opportunityId == null) {
      throw new AuraHandledException('Opportunity Id is required');
    }

    // Fetch Opportunity
    Opportunity opp = [
      SELECT Id, StageName, Amount, CreatedDate
      FROM Opportunity
      WHERE Id = :opportunityId
      LIMIT 1
    ];

    // Fetch metadata rules
    List<Opportunity_Health_Rule__mdt> rules = [
      SELECT Stage__c, Min_Amount__c, Max_Days_Open__c, Health_Status__c
      FROM Opportunity_Health_Rule__mdt
    ];

    // Delegate to service
    OpportunityHealthService.HealthResult result = OpportunityHealthService.evaluate(
      opp,
      rules
    );

    return new HealthResponse(result.status, result.reason);
  }
}
