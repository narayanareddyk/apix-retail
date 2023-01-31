import axios from "./intercetor";
import Config from "../environment";

const http = {
  get: async (url, headers) => axios.get(
     url,
    headers,
  ),
  post: async (url, data = {}, headers = {}) => axios.post(
    url,
    data,
    headers,
  ),
  put: async (url, data = {}, headers = {}) => axios.put(url, data, headers),
};

export default http;
