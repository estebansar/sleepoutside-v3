import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".order-summary");

document.querySelector("#zip").addEventListener("change", () => {
  checkoutProcess.calculateOrdertotal();
});

document.querySelector("#checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  checkoutProcess.checkout(event.target);
});