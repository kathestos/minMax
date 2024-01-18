import http from "../http-common";

class SecretsDataService {
  get(str) {
    return http.get(`/secret${str}`);
  }

}

export default new SecretsDataService();
