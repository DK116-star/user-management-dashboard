import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// GET all users
export const getUsers = async () => {
  return axios.get(API_URL);
};

// POST new user
export const createUser = async (user) => {
  return axios.post(API_URL, user);
};

// PUT update user
export const updateUser = async (id, user) => {
  return axios.put(`${API_URL}/${id}`, user);
};

// DELETE user
export const deleteUser = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};