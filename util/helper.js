import axios from 'axios';
const baseUrl = 'https://scorekeeper-d2fe7-default-rtdb.europe-west1.firebasedatabase.app';

const postData = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/scoreboards.json`, data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response) {
      alert(error.response.data.error.message);
    } else {
      alert('An unknown error occurred');
    }
  }
}

const getData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/scoreboards.json`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response) {
      alert(error.response.data.error.message);
    } else {
      alert('An unknown error occurred');
    }
  }
}

const deleteData = async (id) => {
  try {
    const response = await axios.post(`${baseUrl}/games/${id}.json`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response) {
      alert(error.response.data.error.message);
    } else {
      alert('An unknown error occurred');
    }
  }
}

export { postData, getData, deleteData };