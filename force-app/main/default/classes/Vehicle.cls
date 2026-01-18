/**
 * @description abstract classes cannot be instantiated
 * It can have an abstract method (witout body)
 * and concrete methods (wth body)
 */
public abstract class Vehicle {
  public abstract void start();

  public virtual void stop() {
    System.debug('Vehicls stopped');
  }
}
