import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/nas");
  };

  async count() {
    return await http.get("/api/nas/count");
  };

  async create(data) {
    return await http.post("/api/nas", data);
  }

  async update(id, data) {
    return await http.patch(`/api/nas/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/api/nas/${id}`);
  }

}

export default new endpointDataService();