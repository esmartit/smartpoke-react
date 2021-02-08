import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/states");
  };

  async count() {
    return await http.get("/states/count");
  };

  async create(data) {
    return await http.post("/states", data);
  }

  async update(id, data) {
    return await http.put(`/states/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/states/${id}`);
  }
  
}

export default new endpointDataService();