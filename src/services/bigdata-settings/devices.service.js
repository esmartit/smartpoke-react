import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/devices");
  };

  async getOne(id) {
    return await http.get(`/devices/${id}`);
  };

  async count() {
    return await http.get("/devices/count");
  };

  async create(data) {
    return await http.post("/devices", data);
  }

  async update(id, data) {
    return await http.put(`/devices/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/devices/${id}`);
  }

}

export default new endpointDataService();