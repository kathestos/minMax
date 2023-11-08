import http from "../http-common";

class ExerciseDataService {

    getFiltered(str) {
        return http.get(`/exercises${str}`);
    }

    getDistinct(dist) {
        return http.get(`/distinctExercises${dist}`);
    }

    getDistinctNonStrength(dist) {
        return http.get(`/distinctNonStrength${dist}`);
    }
}

export default new ExerciseDataService();