/**
 * @description This class handles all the trigger dispatches
 */
public class TriggerDispatcher extends BaseLogger {
  private String errorMessage = '';
  /**
   * @description Executes the respective trigger handler for a trigger
   * @param trigger handler to be executed (AbstractTriggerHandler can contain child trigger handlers)
   */
  public static void run(AbstractTriggerHandler handler) {
    TriggerDispatcher dispatcher = new TriggerDispatcher();
    dispatcher.execute(handler);
  }

  /**
   * @description Core method to execute the business logic with the provided handler
   * @param handler - respective objects handler to be executed
   */
  private void execute(AbstractTriggerHandler handler) {
    startTimer();
    try {
      handler.run(); // core-business logic execution
    } catch (Exception e) {
      this.errorMessage = e.getMessage();
      throw e;
    } finally {
      stopTimer();
      Map<String, Integer> limits = captureLimits();
      LogService.persist(
        'AccountTriggerHandler',
        executionTime,
        limits,
        errorMessage
      );
    }
  }
}
