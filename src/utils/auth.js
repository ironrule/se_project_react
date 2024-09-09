import { baseUrl, request } from "./api";
/**============================================
 *            Registration Function
 *=============================================**/
export const register = ({ name, email, password, avatar }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  });
};
/**============================================
 *           Authorization Function
 *=============================================**/
export const authorize = (email, password) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};
