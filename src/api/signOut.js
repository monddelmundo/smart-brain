import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.REACT_APP_DEV_API_URL + "/signout";

export const getProfile = () => {
  fetch(baseUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  })
    .then(handleResponse)
    .catch(handleError);
};
