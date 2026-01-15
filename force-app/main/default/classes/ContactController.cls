public with sharing class ContactController {
  /**
   * Returns contacts for a given Account Id with FLS/CRUD enforced.
   * Uses WITH SECURITY_ENFORCED to ensure field- and object-level checks.
   */
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactsFromAccountId(String accountId) {
    // Return early if no Account Id provided
    if (String.isBlank(accountId)) {
      return new List<Contact>();
    }

    return [
      SELECT Id, LastName
      FROM Contact
      WHERE AccountId = :accountId
      WITH SECURITY_ENFORCED
    ];
  }

  @SuppressWarnings('PMD.ExcessiveParameterList')
  @AuraEnabled
  public static void createContact(
    String firstName,
    String lastName,
    String email,
    String phone,
    String description
  ) {
    List<Contact> consToBeCreated = new List<Contact>();
    Contact con = new Contact();
    con.firstName = firstName;
    con.lastName = lastName;
    con.email = email;
    con.phone = phone;
    con.description = description;

    consToBeCreated.add(con);
    if (!consToBeCreated.isEmpty()) {
      insert consToBeCreated;
    }
  }
}
