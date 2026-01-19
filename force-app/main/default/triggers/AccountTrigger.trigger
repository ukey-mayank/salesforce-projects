trigger AccountTrigger on Account(before insert, after update) {
  TriggerDispatcher.run(new AccountTriggerHandler());
}
