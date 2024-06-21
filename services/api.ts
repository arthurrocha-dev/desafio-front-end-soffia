import axios from "axios";
import { POST_URL } from "./api.urls";


export async function getPost() {
  return await axios
    .get(`${POST_URL}`)
    .then(async (response) => await response.data);
}