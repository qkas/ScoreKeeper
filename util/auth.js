import axios from 'axios';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const register = async (email, password) => {
  const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
  try {
    const response = await axios.post(endpoint, {
      email,
      password,
      returnSecureToken: true,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response) {
      alert(error.response.data.error.message);
    } else {
      alert('An unknown error occurred');
    }
  }
};

const emailLogin = async (email, password) => {
  const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  try {
    const response = await axios.post(endpoint, {
      email,
      password,
      returnSecureToken: true,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response) {
      alert(error.response.data.error.message);
    } else {
      alert('An unknown error occurred');
    }
  }
};

const tokenLogin = async (idToken) => {
  const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;
  try {
    const response = await axios.post(endpoint, { idToken });
    return response.data.users[0];
  } catch (error) {
    console.log(error.response.data);
  }

}

export { register, emailLogin, tokenLogin };
