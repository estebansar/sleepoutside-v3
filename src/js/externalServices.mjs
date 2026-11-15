const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export async function getProductsByCategory(category = "tents") {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function checkout(payload) {
  const response = await fetch(baseURL + "checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return await convertToJson(response);
}

export async function loginRequest(creds) {
  const response = await fetch(baseURL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });

  const data = await convertToJson(response);
  return data.accessToken;
}

export async function getOrders(token) {
  const response = await fetch(baseURL + "orders", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await convertToJson(response);
}