import axios from "axios";

const baseUrl = window.location.origin;
export default axios.create({ baseURL: baseUrl + "/api" });
