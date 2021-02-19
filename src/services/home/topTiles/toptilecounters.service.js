import http from "../../../http-common";

class endpointDataService {

  async getTopTileCounter(resourcePath) {
    return await http.get(resourcePath);
  };
}

export default new endpointDataService();