import { loginRequest } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    setLocalStorage("so_token", token);

    window.location = redirect;
  } catch (err) {
    alert(err.message?.message || "Login failed. Please try again.");
  }
}

export function isTokenValid(token) {
  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);
  const currentDate = new Date();

  if (decoded.exp * 1000 < currentDate.getTime()) {
  console.log("Token expired.");
  return false;
  } else {
  console.log("Valid token.");
  return true;
  }
}
export function checkLogin() {
  const token = getLocalStorage("so_token");
  const valid = isTokenValid(token);

  if (!valid) {
    localStorage.removeItem("so_token");
    const location = window.location;
    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else {
    return token;
  }
}
