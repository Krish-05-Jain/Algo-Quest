import axios from 'axios';

export const getProfile = async (token) => {
  try {
    const res = await axios.get('http://localhost:5000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    return null;
  }
};
