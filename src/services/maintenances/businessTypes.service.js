import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/business-types");
  };

  async getOne(id) {
    return await http.get(`/business-types/${id}`);
  };

  async count() {
    return await http.get("/business-types/count");
  };

  async create(data) {
    return await http.post("/business-types", data);
  }

  async update(id, data) {
    return await http.put(`/business-types/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/business-types/${id}`);
  }

}

export default new endpointDataService();