import axios from "axios";

export default axios.create({
  baseURL: "https://europe-west1.gcp.data.mongodb-api.com/app/min-max-server-ylzqs/endpoint/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});