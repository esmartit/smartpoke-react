import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/api/limitations");
  };

  async count() {
    return await http.get("/api/limitations/count");
  };

  async create(data) {
    return await http.post("/api/limitations", data);
  }

  async update(data) {
    return await http.patch("/api/limitations", data);
  }

  async delete(name) {
    return await http.delete(`/api/limitations/${name}`);
  }

}

export default new endpointDataService();