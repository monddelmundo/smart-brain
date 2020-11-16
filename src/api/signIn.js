import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.REACT_APP_DEV_API_URL + "/signin";

export const postSignInApi = (data) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.signInEmail,
      password: data.signInPassword,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
};

export const postSignInWithoutBodyApi = (token) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then(handleResponse)
    .catch(handleError);
};
