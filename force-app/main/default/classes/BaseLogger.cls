/**
 * @description this is the base class for all logging implementation
 */
public abstract class BaseLogger {
  // variables to capture time consumptions
  protected Long startTime;
  protected Long stopTime;
  protected Long executionTime;

  /**
   * @description captures the start time of a trigger execution
   */
  protected void startTimer() {
    startTime = System.currentTimeMillis();
  }

  /**
   * @description captures the stop time of a trigger execution
   */
  protected void stopTimer() {
    stopTime = System.currentTimeMillis();
    executionTime = stopTime - startTime;
  }

  /**
   * @description captures the limits time after complete trigger execution
   * @return Map<String, Integer>
   *  eg. CPU => Limits.getCpuTime();
   */
  protected Map<String, Integer> captureLimits() {
    Map<String, Integer> metrics = new Map<String, Integer>();
    metrics.put('CPU', Limits.getCpuTime());
    metrics.put('SOQL', Limits.getQueries());
    metrics.put('DML', Limits.getDmlStatements());
    return metrics;
  }
}
