import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.REACT_APP_DEV_API_URL + "/register";

export const postRegisterApi = (data) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
};
