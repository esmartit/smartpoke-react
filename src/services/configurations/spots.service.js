import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/spots");
  };

  async count() {
    return await http.get("/spots/count");
  };

  async create(data) {
    return await http.post("/spots", data);
  }

  async update(id, data) {
    return await http.put(`/spots/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/spots/${id}`);
  }
  
}

export default new endpointDataService();