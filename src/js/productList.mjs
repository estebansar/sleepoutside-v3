import { getData } from "./productData.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
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

export default async function productList(selector, category) {
  // Get the element where the products will appear
  const element = document.querySelector(selector);

  // Get the products from our JSON file
  const products = await getData(category);

  // Check that we received the products
  console.log(products);

// Display all products from the selected category
renderList(products, element);
}
