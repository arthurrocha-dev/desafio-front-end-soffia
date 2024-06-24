import axios from "axios";
import { COMMENTS_URL, POST_URL, USER_URL } from "./api.urls";
import { Post } from "./api.props";

export async function getPost() {
  return await axios
    .get(POST_URL)
    .then(async (response) => await response.data);
}

export async function getPostById(id: number) {
  try {
    const response = await axios.get(`${POST_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter post com ID: ${id}`);
  }
}

export async function createPost(postData: Post) {
  try {
    const response = await axios.post(POST_URL, postData);
    return console.log(response);
  } catch (error) {
    throw new Error("Erro ao criar post");
  }
}

export async function updatePost(post: Post) {
  const postData = {
    id: post.id,
    title: post.title,
    boby: post.body,
  };
  try {
    const response = await axios.put(`${POST_URL}/${postData.id}`, postData);
    return response.data;
  } catch (error) {
    return new Error(`Erro ao atualizar post com ID: ${postData.id}`);
  }
}

export async function deletePost(id: number) {
  try {
    await axios.delete(`${POST_URL}/${id}`);
    return `Post com ID: ${id} foi deletado com sucesso.`;
  } catch (error) {
    throw new Error(`Erro ao deletar post com ID: ${id}`);
  }
}

export async function getUser() {
  try {
    await axios.get(USER_URL).then(async (response) => await response.data);
  } catch (error) {
    throw new Error(`Erro ao obter usuário`);
  }
}

export async function getUserById(id: number) {
  try {
    const response = await axios.get(`${USER_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter usuário com ID: ${id}`);
  }
}

export async function getCommentsByPostId(postId: number) {
  try {
    const response = await axios.get(`${COMMENTS_URL}/?postId=${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter os comentarios com ID: ${postId}`);
  }
}
