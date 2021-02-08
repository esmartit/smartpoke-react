import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/sensors");
  };

  async getOne(id) {
    return await http.get(`/sensors/${id}`);
  };

  async count() {
    return await http.get("/sensors/count");
  };

  async create(data) {
    return await http.post("/sensors", data);
  }

  async update(id, data) {
    return await http.put(`/sensors/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/sensors/${id}`);
  }

}

export default new endpointDataService();