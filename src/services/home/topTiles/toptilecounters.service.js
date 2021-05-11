import http from "../../../http-common";

class endpointDataService {

  async getTopTileCounter(resourcePath) {
    return await http.get(resourcePath);
  };

  getTotalDetectedCount(resourcePath) {
    return http.get(resourcePath);
  };

  getTodayDetectedCount(resourcePath) {
    return http.get(resourcePath);
  };

  getNowDetectedCount(resourcePath) {
    return http.get(resourcePath);
  };

  getTotalRegisteredCount(resourcePath) {
    return http.get(resourcePath);
  };

  getTodayRegisteredCount(resourcePath) {
    return http.get(resourcePath);
  };

  getNowRegisteredCount(resourcePath) {
    return http.get(resourcePath);
  };
}

export default new endpointDataService();