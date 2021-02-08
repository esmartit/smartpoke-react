import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/customers");
  };

  async count() {
    return await http.get("/customers/count");
  };

  async create(data) {
    return await http.post("/customers", data);
  }

  async update(id, data) {
    return await http.put(`/customers/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/customers/${id}`);
  }

}

export default new endpointDataService();