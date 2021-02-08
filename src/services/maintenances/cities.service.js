import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/cities");
  };

  async count() {
    return await http.get("/cities/count");
  };

  async create(data) {
    return await http.post("/cities", data);
  }

  async update(id, data) {
    return await http.put(`/cities/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/cities/${id}`);
  }
  
}

export default new endpointDataService();