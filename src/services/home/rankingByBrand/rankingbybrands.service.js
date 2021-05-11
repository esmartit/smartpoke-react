import http from "../../../http-common";

class endpointDataService {

  getRankingByBrand(resourcePath) {
    return http.get(resourcePath);
  };
}

export default new endpointDataService();