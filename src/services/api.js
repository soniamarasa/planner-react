import axios from 'axios';
import { getLocalStorage } from '../helpers/LocalStorage';

export const token = getLocalStorage('auth');
export const userId = getLocalStorage('userId');

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: token && { Authorization: token.user.token },
});

//USER
export const createAccount = (user) => {
  return api
    .post('createAccount', user)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const login = (data) => {
  return api
    .post('login', data)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const logout = (userId) => {
  return api
    .post('logout', { id: userId })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const retrievePassword = (data) => {
  return api
    .post('retrievePassword', data)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const resetPassword = (data) => {
  return api
    .post('resetPassword', data)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const user = (userId) => {
  return api
    .get(`user/${userId}`)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const updateUser = (userId, user) => {
  return api
    .put(`updateUser/${userId}`, user)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

//ITEMS
export const getItems = (userId) => {
  return api
    .get(`getItems/${userId}`)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const postItem = (userId, item) => {
  return api
    .post(`postItem/${userId}`, item)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const updateItem = (userId, id, item) => {
  return api
    .put(`editItem/${userId}/${id}`, item)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const updateStatus = (userId, id, item) => {
  return api
    .put(`updateStatus/${userId}/${id}`, item)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const deleteItem = (userId, id) => {
  return api
    .delete(`deleteItem/${userId}/${id}`)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};

export const resetPlanner = (userId) => {
  return api
    .delete(`${userId}/reset`)
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};
