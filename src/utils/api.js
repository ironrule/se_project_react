export const baseUrl = "http://localhost:3001";
/**============================================
 *           Fetch and Check Functions
 *=============================================**/
export function request(urlLocation, options) {
  return fetch(urlLocation, options).then(checkResponse);
}

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}
/**============================================
 *            Clothing Item Functions
 *=============================================**/
export function getClothingItems() {
  return request(baseUrl + "/items");
}

export function addClothingItem(item, token) {
  return request(baseUrl + "/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

export function deleteClothingItem(itemID, token) {
  return request(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addCardLike(itemID, token) {
  return request(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function removeCardLike(itemID, token) {
  return request(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
/**============================================
 *            User Info Functions
 *=============================================**/
export const getUserInfo = (token) => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editUserInfo = (name, avatar, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};
