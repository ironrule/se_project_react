const baseUrl = "http://localhost:3001";

export function getClothingItems() {
  return request(`${baseUrl}/items`);
}

export function request(baseUrl, options) {
  return fetch(baseUrl, options).then(checkResponse);
}

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function addClothingItem(item) {
  return request("/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
}

export function deleteClothingItem(itemID) {
  return request(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}
