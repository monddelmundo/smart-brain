import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.REACT_APP_DEV_API_URL + "/imageurl";

export const postImageUrlApi = (token, input) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({
      input,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
};
