public with sharing class Car extends Vehicle {
  public override void start() {
    System.debug('Car Started');
  }

  public override void stop() {
    super.stop();
    System.debug('Car Stopped');
  }
}
