/*
@description this class focuses on getting current, historical data from Weather Stack API
Created By: Mayank Ukey
Date: 15th Jan, 2026
*/
public with sharing class WeatherService {
  // this class variable stores the secret API_KEY
  private static final String ACCESS_KEY = 'c175fa7098d54aa2053fb1fd8d58c754';
  private static final String BASE_URL = 'https://api.weatherstack.com/';

  /*
   * @description this method performs callout to https://api.weatherstack.com/ base url.
   * As per the user input, current, historical, forecast data can be get for a particular location in the world
   * @param String location - any location in the world
   * 		String dataType - current, historical, forecase
   */
  @AuraEnabled
  public static void getWeatherData(String location, String dataType) {
    System.debug('Location: ' + location);
    System.debug('Data Type: ' + dataType);
    Http http = new Http();
    HttpRequest req = new HttpRequest();
    req.setMethod('GET');
    req.setEndpoint(
      BASE_URL +
        dataType +
        '?access_key=' +
        ACCESS_KEY +
        '&query=' +
        EncodingUtil.urlEncode(location, 'UTF-8')
    );

    HttpResponse res = http.send(req);
    System.debug('Http Response: ' + res);
  }
}
