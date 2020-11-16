import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.REACT_APP_DEV_API_URL + "/signin";

export const postSignIn = (data) => {
  fetch(baseUrl, {
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
