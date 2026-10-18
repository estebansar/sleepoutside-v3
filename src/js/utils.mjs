// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Render a single HTML template
export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true,
) {
  const template = await templateFn(data);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, template);

  if (callback) {
    callback(data);
  }
}

// Load an HTML template from a file
export function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);

    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

// Load the shared header and footer
export async function loadHeaderFooter() {
  const headerTemplate = loadTemplate("/partials/header.html");
  const footerTemplate = loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  await renderWithTemplate(headerTemplate, headerElement);
  await renderWithTemplate(footerTemplate, footerElement);
}
