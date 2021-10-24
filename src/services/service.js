import axios from 'axios';

const api = 'http://localhost:3001/api'

// const api = axios.create({
//     baseURL: 
// });

const getItems = async (where) => {
    const response = await fetch(`${api}/getItems/${where}`);
    const data = await response.json();
    return data;
  };


export default getItems;