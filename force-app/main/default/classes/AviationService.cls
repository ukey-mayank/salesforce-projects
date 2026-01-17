/**
 * @description you can fetch real-time aviation data
 */
public with sharing class AviationService {
  @AuraEnabled
  public static List<FlightDTO> getAviationData(Integer flightLimit) {
    // retrieve API Key from custom metadata record
    String apiKey = Aviation_Config__mdt.getInstance('Default').Api_Key__c;

    // construct endpoint URL from Named Credential => AviationStack + apiKey
    String endPoint = 'callout:AviationStack/v1/flights?access_key=' + apiKey;

    // limit is an optionsla parameter to size the flights data
    if (flightLimit != 0) {
      endPoint += '&limit=' + flightLimit;
    }

    // construction of HTTP request
    Http http = new Http();
    HttpRequest req = new HttpRequest();
    req.setMethod('GET');
    req.setEndpoint(endPoint);

    HttpResponse res = http.send(req);
    // deserialize the response body
    Map<String, Object> payload = (Map<String, Object>) JSON.deserializeUntyped(
      res.getBody()
    );

    List<Object> data = (List<Object>) payload.get('data');

    // calls a method parseResponse to get proper response which can be used in LWC
    return parseResponse(data);
  }

  /**
   * @description A response parser which maps the correct fields from response to the wrapper class fields.
   * @param deserialized List<Object> flightData, contains multiple flight details
   */
  public static List<FlightDTO> parseResponse(List<Object> flightData) {
    // null check to confirm the correctness of api-call
    if (flightData != null) {
      // data needs to be returned
      List<FlightDTO> flights = new List<FlightDTO>();

      // for-loop to lopp over flight data and map to wrapper class fields
      for (Object obj : flightData) {
        // create new instance of FlightDTO wrapper class for every object in the loop
        FlightDTO flight = new FlightDTO();

        // map the object correctly to Map<String, Object> format, to retrieve data correctly
        Map<String, Object> row = (Map<String, Object>) obj;
        flight.flight_date = (String) row.get('flight_date');
        flight.flight_status = (String) row.get('flight_status');

        // map departure fields
        if (row.get('departure') != null) {
          Map<String, Object> departure = (Map<String, Object>) row.get(
            'departure'
          );
          flight.dep_airport = (String) departure.get('airport');
          flight.dep_timezone = (String) departure.get('timezone');
        }

        // map arrival fields
        if (row.get('arrival') != null) {
          Map<String, Object> arrival = (Map<String, Object>) row.get(
            'arrival'
          );
          flight.arrival_airport = (String) arrival.get('airport');
          flight.arrival_timezone = (String) arrival.get('timezone');
        }

        // map airline fields
        if (row.get('airline') != null) {
          Map<String, Object> airline = (Map<String, Object>) row.get(
            'airline'
          );
          flight.airline_name = (String) airline.get('name');
        }

        // map flight fields
        if (row.get('flight') != null) {
          Map<String, Object> airline = (Map<String, Object>) row.get('flight');
          flight.flight_number = (String) airline.get('number');
        }

        flights.add(flight);
      }

      // list of flights data
      return flights;
    }
    return null;
  }

  /**
   * @description wrapper class to store the response structure
   */
  @SuppressWarnings('PMD.FieldNamingConventions')
  public class FlightDTO {
    @AuraEnabled
    public String flight_date; // part of data
    @AuraEnabled
    public String flight_status; // part of data
    @AuraEnabled
    public String dep_airport; // part of data -> departure
    @AuraEnabled
    public String dep_timezone; // part of data -> departure
    @AuraEnabled
    public String arrival_airport; // part of data -> arrival
    @AuraEnabled
    public String arrival_timezone; // part of data -> arrival
    @AuraEnabled
    public String airline_name; // part of data -> airline
    @AuraEnabled
    public String flight_number; // part of data -> flight
  }
}
