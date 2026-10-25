import productList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
productList(".product-list", category);

// Show the selected category in the page title
document.getElementById("category-title").textContent =
  `Top Products: ${category.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}`;