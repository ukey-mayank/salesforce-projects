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
  public static WeatherDTO getWeatherData(String location, String dataType) {
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
    Map<String, Object> payload = (Map<String, Object>) JSON.deserializeUntyped(
      res.getBody()
    );
    
    return parseResponse(payload);  
  }
    
    /*
     * @description A response parser which maps the correct fields from response to the wrapper class fields.
     * @param deserialized payload, available to be consumed as a JSON
	*/
    public static WeatherDTO parseResponse(Map<String, Object> payload){
        WeatherDTO weather = new WeatherDTO(); // created a new instance WeatherDTO wrapper
        if(payload!=null){
            if(payload.get('location')!=null){ // null check for location
                Map<String, Object> location = (Map<String, Object>)payload.get('location');
                weather.name = (String)location.get('name');
                weather.country = (String)location.get('country');
                weather.timezone_id = (String)location.get('timezone_id');
            }
            if(payload.get('current')!=null){ // null check for current
                Map<String, Object> current = (Map<String, Object>)payload.get('current');
                weather.observation_time = (String)current.get('observation_time');
                weather.temperature = (Integer)current.get('temperature');
                List<Object> weatherDescription = (List<Object>)current.get('weather_descriptions'); // referencing the list
                weather.weather_description = (String)weatherDescription[0]; // first-item denotes the weather description
                weather.wind_speed = (Integer)current.get('wind_speed');
                weather.pressure = (Integer)current.get('pressure');
                weather.humidity = (Integer)current.get('humidity');
                weather.visibility = (Integer)current.get('visibility');
                weather.is_day = (String)current.get('is_day');
                
                if(current.get('astro')!=null){ // null check for astro
                    Map<String, Object> astro = (Map<String, Object>)current.get('astro');
                    weather.sunrise = (String)astro.get('sunrise');
                    weather.sunset = (String)astro.get('sunset');
                }
                
                if(current.get('air_quality')!=null){ // null check for air_quality
                    Map<String, Object> air_quality = (Map<String, Object>)current.get('air_quality');
                    weather.pm2_5 = (String)air_quality.get('pm2_5');
                }
            }
        }
        return weather;
    }
    
    /*
     * @description this is a wrapper for our waether data which maps the UI fields to be shown
     * To include more fields to be shown, convert this wrapper likewise
	*/
    public class WeatherDTO{
        @AuraEnabled public String name; // part of location
        @AuraEnabled public String country; // part of location
        @AuraEnabled public String timezone_id; // part of location
        @AuraEnabled public String observation_time; // part of current
        @AuraEnabled public Integer temperature; // part of current
        @AuraEnabled public String weather_description; // part of current
        @AuraEnabled public String sunrise; // part of current -> astro
        @AuraEnabled public String sunset; // part of current -> astro
        @AuraEnabled public String pm2_5; // part of current -> air_quality
        @AuraEnabled public Integer wind_speed; // part of current
        @AuraEnabled public Integer pressure; // part of current
        @AuraEnabled public Integer humidity; // part of current
        @AuraEnabled public Integer visibility; // part of current
        @AuraEnabled public String is_day; // part of current
    }
}