import axios from "axios";
const baseUrl = "http://localhost:3000";

const getUserWithGoogle = () => {
  const request = axios.get(`${baseUrl}/oauthGoogle/userInfo`);
  return request.then((response) => response.data);
};

export default {
  getUserWithGoogle,
};
