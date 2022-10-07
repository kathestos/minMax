import http from "../http-common";

class FoodDataService {

    getFiltered(str) {
        return http.get(`/food${str}`);
    }

    getDistinct(dist) {
        return http.get(`/distinctFood${dist}`);
    }

    getSubtypes() {
        return http.get(`/foodSubtypes`);
    }
}

export default new FoodDataService();