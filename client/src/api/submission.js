import axios from 'axios';

export const submitCode = async (token, payload) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/submissions/submit',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  } catch (err) {
    return { error: 'Error occurred' };
  }
};
