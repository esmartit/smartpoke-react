import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/countries");
  };

  async count() {
    return await http.get("/countries/count");
  };

  async create(data) {
    return await http.post("/countries", data);
  }

  async update(id, data) {
    return await http.put(`/countries/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/countries/${id}`);
  }

}

export default new endpointDataService();