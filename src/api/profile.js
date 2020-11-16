import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.REACT_APP_DEV_API_URL + "/profile";

export const postProfileApi = (token, id, data) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ formInput: data }),
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getProfileApi = (token, id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  })
    .then(handleResponse)
    .catch(handleError);
};
