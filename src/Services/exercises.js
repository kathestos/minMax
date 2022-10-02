import http from "../http-common";

class ExerciseDataService {

    getFiltered(str) {
        return http.get(`/exercises${str}`);
    }

    getDistinct(dist) {
        return http.get(`/distinctExercises${dist}`);
    }
}

export default new ExerciseDataService();