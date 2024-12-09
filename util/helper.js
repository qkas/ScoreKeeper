import axios from 'axios';

const baseUrl = 'https://scorekeeper-d2fe7-default-rtdb.europe-west1.firebasedatabase.app';

const postData = async (uid, data, idToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/scoreboards/${uid}.json?auth=${idToken}`, 
      data, { headers: { 'Bearer':  idToken} }
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.error?.message || error.response?.data?.error || 'An unknown error occurred');
  }
};

const getData = async (uid, idToken) => {
  try {
    const response = await axios.get(
      `${baseUrl}/scoreboards/${uid}.json?auth=${idToken}`, 
      { headers: { 'Bearer':  idToken} }
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.error?.message || error.response?.data?.error || 'An unknown error occurred');
  }
};

const deleteData = async (uid, id, idToken) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/scoreboards/${uid}/${id}.json?auth=${idToken}`, 
      { headers: { 'Bearer':  idToken} }
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.error?.message || error.response?.data?.error || 'An unknown error occurred');
  }
};

export { postData, getData, deleteData };
