import http from "../http-common";

class TrainingDataService {
  getArray() {
    return http.get(`/training`);
  }

  setArray(arr) {
    return http.post(`/postTraining?array=${JSON.stringify(arr)}`);
  }
}

export default new TrainingDataService();
