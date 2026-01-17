/**
 * @description base abstract class for API services
 */
public abstract class BaseApiService {
  /**
   * @description sends a GET request to the specified endpoint
   * @param endPoint the endpoint URL of API service
   */
  protected HttpResonse sendGet(String endPoint) {
    Http http = new Http();
    HttpRequest req = new HttpRequest();
    req.setMethod('GET');
    req.setEndpoint(endPoint);
    req.setTimeout(10000);

    return http.send(req);
  }
}
