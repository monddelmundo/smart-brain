import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.REACT_APP_DEV_API_URL + "/image";

export const getImageApi = (token, id) => {
  return fetch(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
};
