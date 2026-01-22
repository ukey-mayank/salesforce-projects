/**
 * @description
 * Async job to run escalation logic
 */
public with sharing class CaseEscalationQueueable implements Queueable {
  public void execute(QueueableContext context) {
    try {
      CaseEscalationService.processEscalations();
    } catch (Exception e) {
      System.debug('Escalation job failed: ' + e.getMessage());
    }
  }
}
