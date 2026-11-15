import { loadHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";


loadHeaderFooter();

const redirect = getParam("redirect");

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const creds = {
    email: email,
    password: password,
  };

  login(creds, redirect || "/");
});