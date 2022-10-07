import http from "../http-common";

class IconsDataService {
  get(str) {
    return http.get(`/icon${str}`);
  }

  getAll() {
    return http.get(`/icons`);
  }
}

export default new IconsDataService();
