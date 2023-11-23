import axios from "axios";
const baseUrl = "http://localhost:3000";

const getUserWithGoogle = (accessToken) => {
  const request = axios.post(`${baseUrl}/oauthGoogle`, {accessToken});
  return request.then((response) => response.data);
};

export default {
  getUserWithGoogle,
};
