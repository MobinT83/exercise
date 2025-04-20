let cart = [];

document.querySelectorAll(".buy-btn").forEach((btn) => {
  attachBuyButton(btn);
});

function createControlBox(productEl) {
  const actionDiv = productEl.querySelector(".action");
  const productId = productEl.dataset.id;
  const productName = productEl.dataset.name;
  const productPrice = parseInt(productEl.dataset.price);
  console.log(createControlBox);

  let item = cart.find((p) => p.id === productId);
  if (!item) {
    item = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    };
    cart.push(item);
  }

  const control = document.createElement("div");
  control.className = "control-box";
  control.innerHTML = `
      <button class="remove-btn">🗑️</button>
      <button class="minus-btn">-</button>
      <span class="qty">${item.quantity}</span>
      <button class="plus-btn">+</button>
    `;

  actionDiv.innerHTML = "";
  actionDiv.appendChild(control);

  const qty = control.querySelector(".qty");

  control.querySelector(".plus-btn").addEventListener("click", () => {
    item.quantity++;
    qty.textContent = item.quantity;
    showCart();
    updateTotalPrice();
  });

  control.querySelector(".minus-btn").addEventListener("click", () => {
    if (item.quantity > 1) {
      item.quantity--;
      qty.textContent = item.quantity;
      showCart();
      updateTotalPrice();
    }
  });

  control.querySelector(".remove-btn").addEventListener("click", () => {
    cart = cart.filter((p) => p.id !== productId);
    actionDiv.innerHTML = `
    <div class="action mt-3 flex justify-between items-center">
          <span class="font-bold text-orange-600">${item.price}</span>
          <button
            class="buy-btn bg-orange-500 text-white px-3 py-1.5 rounded text-sm hover:bg-orange-600 transition-colors"
          >
            خرید
          </button>
        </div>`;
    attachBuyButton(actionDiv.querySelector(".buy-btn"));
    showCart();
    updateTotalPrice();
  });

  showCart();
  updateTotalPrice();
}

function attachBuyButton(button) {
  button.addEventListener("click", () => {
    const productEl = button.closest(".product");
    createControlBox(productEl);
  });
}

function showCart() {
  console.clear();
  console.table(cart);
}

function updateTotalPrice() {
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });
  document.getElementById("total-price").textContent = total.toLocaleString();
}
