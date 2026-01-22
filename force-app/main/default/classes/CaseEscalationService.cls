/**
 * @description
 * Service to auto-escalate cases based on SLA and priority
 * Rules are driven by Custom Metadata (Case_Escalation_Rule__mdt)
 *
 * Author: Mayank
 */
public with sharing class CaseEscalationService {
  /**
   * Entry point – called from scheduler / batch
   */
  public static void processEscalations() {
    Map<String, Case_Escalation_Rule__mdt> ruleMap = getActiveRules();

    if (ruleMap.isEmpty()) {
      return;
    }

    List<Case> casesToUpdate = new List<Case>();
    List<Escalation_Log__c> logs = new List<Escalation_Log__c>();

    List<Case> openCases = fetchEligibleCases(ruleMap.keySet());

    for (Case c : openCases) {
      Case_Escalation_Rule__mdt rule = ruleMap.get(c.Priority);

      if (rule == null)
        continue;

      if (isSLABreached(c, rule)) {
        Id newOwnerId = getUserIdFromUsername(rule.Escalation_User_Username__c);

        if (newOwnerId == null)
          continue;

        logs.add(createLog(c, newOwnerId, rule));

        c.OwnerId = newOwnerId;
        casesToUpdate.add(c);
      }
    }

    if (!casesToUpdate.isEmpty()) {
      update casesToUpdate;
    }

    if (!logs.isEmpty()) {
      insert logs;
    }
  }

  /**
   * Fetch active escalation rules
   */
  private static Map<String, Case_Escalation_Rule__mdt> getActiveRules() {
    Map<String, Case_Escalation_Rule__mdt> mapRules = new Map<String, Case_Escalation_Rule__mdt>();

    for (Case_Escalation_Rule__mdt r : [
      SELECT Priority__c, SLA_Hours__c, Escalation_User_Username__c
      FROM Case_Escalation_Rule__mdt
    ]) {
      mapRules.put(r.Priority__c, r);
    }

    return mapRules;
  }

  /**
   * Fetch open cases based on priorities
   */
  private static List<Case> fetchEligibleCases(Set<String> priorities) {
    return [
      SELECT Id, OwnerId, Priority, CreatedDate
      FROM Case
      WHERE Status != 'Closed' AND Priority IN :priorities
    ];
  }

  /**
   * SLA breach check
   */
  private static Boolean isSLABreached(Case c, Case_Escalation_Rule__mdt rule) {
    Integer slaHours = Integer.valueOf(rule.SLA_Hours__c);

    Long diff = (System.now().getTime() - c.CreatedDate.getTime()) / 3600000;

    return diff >= slaHours;
  }

  /**
   * Get user id from username
   */
  private static Id getUserIdFromUsername(String username) {
    if (String.isBlank(username)) {
      return null;
    }

    List<User> users = [
      SELECT Id
      FROM User
      WHERE Username = :username
      LIMIT 1
    ];

    return users.isEmpty() ? null : users[0].Id;
  }

  /**
   * Create escalation log
   */
  private static Escalation_Log__c createLog(
    Case c,
    Id newOwnerId,
    Case_Escalation_Rule__mdt rule
  ) {
    return new Escalation_Log__c(
      Case__c = c.Id,
      Old_Owner__c = c.OwnerId,
      New_Owner__c = newOwnerId,
      Escalation_Reason__c = 'Priority ' +
        c.Priority +
        ' breached SLA of ' +
        rule.SLA_Hours__c +
        ' hours'
    );
  }
}
