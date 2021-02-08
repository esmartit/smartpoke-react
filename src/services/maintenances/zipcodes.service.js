import http from "../../http-common";

class endpointDataService {

  async getAll() {
    return await http.get("/zipcodes");
  };

  async count() {
    return await http.get("/zipcodes/count");
  };

  async create(data) {
    return await http.post("/zipcodes", data);
  }

  async update(id, data) {
    return await http.put(`/zipcodes/${id}`, data);
  }

  async delete(id) {
    return await http.delete(`/zipcodes/${id}`);
  }
  
}

export default new endpointDataService();