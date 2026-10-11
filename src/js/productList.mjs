import { getData } from "./productData.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

function renderList(list, element) {
  const htmlStrings = list.map(productCardTemplate);
  element.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
}

function filterProducts(products) {
  const productIds = ["880RR", "985RF", "985PR", "344YJ"];
  return products.filter((product) => productIds.includes(product.Id));
}

export default async function productList(selector, category) {
  // Get the element where the products will appear
  const element = document.querySelector(selector);

  // Get the products from our JSON file
  const products = await getData(category);

  // Check that we received the products
  console.log(products);

  // Filter the products to show only the original four tents
  const filteredProducts = filterProducts(products);

  // Display the filtered products on the page
  renderList(filteredProducts, element);
}