import axios from "axios";
import { POST_URL } from "./api.urls";
import { Post } from "@/hooks/usePosts";

export async function getPost() {
  return await axios
    .get(POST_URL)
    .then(async (response) => await response.data);
}

export async function getPostById(postId: number) {
  try {
    const response = await axios.get(`${POST_URL}/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter post com ID: ${postId}`);
  }
}

export async function createPost(postData: { title: string; body: string; }) {
  try {
    const response = await axios.post(POST_URL, postData);
    return  console.log(response);
  } catch (error) {
    throw new Error('Erro ao criar post');
  }
}