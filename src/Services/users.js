import http from "../http-common";

class UsersDataService {
  register(str) {
    return http.post(`/register${str}`);
  }

  login(str) {
    return http.post(`/login${str}`);
  }
}

export default new UsersDataService();
