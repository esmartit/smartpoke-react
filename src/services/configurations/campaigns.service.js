import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/campaigns");
  };

  async count() {
    return await http.get("/campaigns/count");
  };

  async create(data) {
    return await http.post("/campaigns", data);
  }

  async update(id, data) {
    return await http.put(`/campaigns/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/campaigns/${id}`);
  }

}

export default new endpointDataService();