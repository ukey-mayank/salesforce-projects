public with sharing class ContactValidator {
  @AuraEnabled
  public static void validateEmail(String email) {
    if (email == null || !email.contains('@')) {
      throw new AuraHandledException('Invalid email format');
    }
  }
}
