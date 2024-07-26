const baseUrl = "http://localhost:3001";

export function getClothingItems() {
  return request("/items");
}

export function request(urlLocation, options) {
  return fetch(baseUrl + urlLocation, options).then(checkResponse);
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
  return request(`/items/${itemID}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}
