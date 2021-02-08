import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/zones");
  };

  async count() {
    return await http.get("/zones/count");
  };

  async create(data) {
    return await http.post("/zones", data);
  }

  async update(id, data) {
    return await http.put(`/zones/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/zones/${id}`);
  }
  
}

export default new endpointDataService();