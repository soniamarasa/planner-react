import axios from 'axios';
import { getLocalStorage, setLocalStorage } from '../helpers/LocalStorage';
import { toast } from 'react-toastify';
import { toastConfig } from '../helpers/ToastConfig';

export const getToken = () => {
  let token = '';
  if (getLocalStorage('auth')) token = getLocalStorage('auth').user.token;
  return token;
};

export const api = axios.create();

const endpoints = ['login'];

const checkEndpoint = (url) => {
  return endpoints.some((endpoint) => url.includes(endpoint));
};

api.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('auth')?.user?.token;
    config.baseURL = process.env.REACT_APP_BASE_URL;

    if (token && !checkEndpoint(config.url)) {
      config.headers['Authorization'] = token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
//USER
export const createAccount = (user) => {
  return api
    .post('createAccount', user)
    .then((response) => {
      toast.success('Your account has been successfully created.', toastConfig);
      return response;
    })
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const login = (data) => {
  return api
    .post('login', data)
    .then((response) => response)
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const logout = () => {
  return api
    .post('logout', { id: getLocalStorage('userId') })
    .then(() => {})
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const retrievePassword = (data) => {
  return api
    .post('retrievePassword', data)
    .then((response) => {
      toast.success(response.data.message, toastConfig);
      return response;
    })
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const resetPassword = (password, token) => {
  return api
    .post(
      'resetPassword',
      { password },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => response)
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const getUser = () => {
  return api
    .get(`user/${getLocalStorage('userId')}`)
    .then((response) => response)
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const updateUser = (user) => {
  return api
    .put(`updateUser/${getLocalStorage('userId')}`, user)
    .then((response) => {
      let auth = getLocalStorage('auth');
      auth.user.name = response.data.name;

      setTimeout(() => {
        setLocalStorage('auth', auth);
      }, 100);

      toast.success('Your account details have been updated!', toastConfig);

      return response;
    })
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

//ITEMS
export const getItems = () => {
  return api
    .get(`getItems/${getLocalStorage('userId')}`)
    .then((response) => response)
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const newItem = (item) => {
  return api
    .post(`postItem/${getLocalStorage('userId')}`, item)
    .then((response) => {
      toast.success('Successfully created item!', toastConfig);
      return response;
    })
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const updateItem = (id, item) => {
  return api
    .put(`editItem/${getLocalStorage('userId')}/${id}`, item)
    .then((response) => {
      toast.success('Successfully updated item.', toastConfig);
      return response;
    })
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const updateStatus = (id, item) => {
  return api
    .put(`updateStatus/${getLocalStorage('userId')}/${id}`, item)
    .then((response) => {
      toast.success(response.data.message, toastConfig);
      return response;
    })
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const deleteItem = (id) => {
  return api
    .delete(`deleteItem/${getLocalStorage('userId')}/${id}`)
    .then((response) => {
      toast.success('Successfully deleted item!', toastConfig);
      return response;
    })
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};

export const resetPlanner = () => {
  return api
    .delete(`${getLocalStorage('userId')}/reset`)
    .then((response) => {
      toast.success(response.data.message, toastConfig);
      return response;
    })
    .catch((err) => {
      toast.error(err.response.data.error, toastConfig);
    });
};
