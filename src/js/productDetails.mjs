import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

let product;

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails(product);

  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

function renderProductDetails(product) {
  document.getElementById("productName").textContent = product.Brand.Name;
  document.getElementById("productNameWithoutBrand").textContent =
    product.NameWithoutBrand;
  document.getElementById("productImage").src = product.Image;
  document.getElementById("productImage").alt = product.Name;
  document.getElementById("productFinalPrice").textContent =
    `$${product.FinalPrice}`;
  document.getElementById("productColorName").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = product.Id;
}

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}