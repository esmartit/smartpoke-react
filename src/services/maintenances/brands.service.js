import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/brands");
  };

  async getOne(id) {
    return await http.get(`/brands/${id}`);
  };

  async count() {
    return await http.get("/brands/count");
  };

  async create(data) {
    return await http.post("/brands", data);
  }

  async update(id, data) {
    return await http.put(`/brands/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/brands/${id}`);
  }

}

export default new endpointDataService();