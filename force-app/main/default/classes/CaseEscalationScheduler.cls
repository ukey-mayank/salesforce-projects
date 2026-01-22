/**
 * @description
 * Schedules escalation job to run periodically
 */
global class CaseEscalationScheduler implements Schedulable {
  global void execute(SchedulableContext sc) {
    System.enqueueJob(new CaseEscalationQueueable());
  }
}
