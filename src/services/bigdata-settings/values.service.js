import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/values");
  };

  async getOne(id) {
    return await http.get(`/values/${id}`);
  };

  async count() {
    return await http.get("/values/count");
  };

  async create(data) {
    return await http.post("/values", data);
  }

  async update(id, data) {
    return await http.put(`/values/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/values/${id}`);
  }

}

export default new endpointDataService();