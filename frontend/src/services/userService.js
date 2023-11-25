import axios from "axios";
const baseUrl = "http://localhost:3000";

const getUserWithGoogle = () => {
  const request = axios.get(`${baseUrl}/oauthGoogle/userInfo`, {
    withCredentials: true,
  });
  return request.then((response) => response.data);
};
const getGoogleCalendar = () => {
  const request = axios.get(`${baseUrl}/oauthGoogle/userCalendar`, {
    withCredentials: true,
  });
  return request.then((response) => response.data);
};

const loginGoogle = () => {
  const request = axios.post(`${baseUrl}/oauthGoogle/login`);

  return request.then((response) => response.data);
};

const addEventGoogle= (newEvent) => {
  const request = axios.post(`${baseUrl}/oauthGoogle/addEvent`,newEvent, {
    withCredentials: true
  });
  return request.then((response) => response.data);
}

export default {
  getUserWithGoogle,
  getGoogleCalendar,
  loginGoogle,
  addEventGoogle
};
