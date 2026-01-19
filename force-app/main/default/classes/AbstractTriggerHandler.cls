/**
 * @description trigger wrapper class for all the triggers to have a centralized implementation
 */
public abstract class AbstractTriggerHandler {
  public void run() {
    // Before Triggers
    if (Trigger.isBefore) {
      if (Trigger.isInsert) {
        beforeInsert();
      } else if (Trigger.isUpdate) {
        beforeUpdate();
      } else if (Trigger.isDelete) {
        beforeDelete();
      }
    } // EOD - else if (Trigger.isBefore)
    // After Triggers
    else if (Trigger.isAfter) {
      if (Trigger.isInsert) {
        afterInsert();
      } else if (Trigger.isUpdate) {
        afterUpdate();
      } else if (Trigger.isDelete) {
        afterDelete();
      } else if (Trigger.isUndelete) {
        afterUndelete();
      }
    } // EOD - else if (Trigger.isAfter)
  }

  // Hooks
  @SuppressWarnings('PMD.EmptyStatementBlock')
  protected virtual void beforeInsert() {
  }
  @SuppressWarnings('PMD.EmptyStatementBlock')
  protected virtual void beforeUpdate() {
  }
  @SuppressWarnings('PMD.EmptyStatementBlock')
  protected virtual void beforeDelete() {
  }
  @SuppressWarnings('PMD.EmptyStatementBlock')
  protected virtual void afterInsert() {
  }
  @SuppressWarnings('PMD.EmptyStatementBlock')
  protected virtual void afterUpdate() {
  }
  @SuppressWarnings('PMD.EmptyStatementBlock')
  protected virtual void afterDelete() {
  }
  @SuppressWarnings('PMD.EmptyStatementBlock')
  protected virtual void afterUndelete() {
  }
}
