import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,

  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key) || [];
    this.calculateItemSummary();
  },

  calculateItemSummary: function () {
    this.itemTotal = 0;

    this.list.forEach((item) => {
        this.itemTotal += item.FinalPrice;
    });

    document.querySelector("#subtotal").textContent =
        `$${this.itemTotal.toFixed(2)}`;
},

  calculateOrdertotal: function () {
    const itemCount = this.list.length;

    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    this.displayOrderTotals();
  },

    displayOrderTotals: function () {
    document.querySelector("#shipping").textContent =
        `$${this.shipping.toFixed(2)}`;

    document.querySelector("#tax").textContent =
        `$${this.tax.toFixed(2)}`;

    document.querySelector("#order-total").textContent =
        `$${this.orderTotal.toFixed(2)}`;
    },

};

export default checkoutProcess;