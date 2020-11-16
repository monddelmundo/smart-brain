import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.REACT_APP_DEV_API_URL + "/profile";

export const postProfile = (id, data) => {
  fetch(`${baseUrl}/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ formInput: data }),
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getProfile = (id) => {
  fetch(`${baseUrl}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  })
    .then(handleResponse)
    .catch(handleError);
};
