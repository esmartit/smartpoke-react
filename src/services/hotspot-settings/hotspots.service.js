import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/hotspots");
  };

  async count() {
    return await http.get("/hotspots/count");
  };

  async create(data) {
    return await http.post("/hotspots", data);
  }

  async update(id, data) {
    return await http.put(`/hotspots/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/hotspots/${id}`);
  }
  
}

export default new endpointDataService();