const ORDER_KEY = "indianBazaar.orders.v1";
const CART_KEY = "indianBazaar.cart.v1";
const PASSWORD_KEY = "indianBazaar.staffPasswordHash.v1";
const AUTH_KEY = "indianBazaar.staffUnlocked.v1";

const products = [
  {
    id: "basmati-rice",
    type: "Grocery",
    category: "Rice and atta",
    name: "Basmati Rice 10 lb",
    description: "Long-grain rice for biryani, pulao, and everyday meals.",
    price: 18.99,
    badge: "Pantry",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "chakki-atta",
    type: "Grocery",
    category: "Rice and atta",
    name: "Whole Wheat Atta 20 lb",
    description: "Fresh flour for roti, paratha, and chapati.",
    price: 16.49,
    badge: "Staple",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "garam-masala",
    type: "Grocery",
    category: "Spices",
    name: "Garam Masala",
    description: "Warm spice blend for curries, dals, and marinades.",
    price: 4.49,
    badge: "Spice",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "frozen-naan",
    type: "Grocery",
    category: "Frozen",
    name: "Frozen Garlic Naan",
    description: "Heat-and-serve naan for curry nights.",
    price: 3.99,
    badge: "Frozen",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "thums-up",
    type: "Grocery",
    category: "Drinks",
    name: "Thums Up",
    description: "Classic Indian cola, chilled and ready for pickup.",
    price: 1.99,
    badge: "Drink",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "parle-g",
    type: "Grocery",
    category: "Snacks",
    name: "Parle-G Biscuits",
    description: "Tea-time favorite for the pantry.",
    price: 2.49,
    badge: "Snack",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "samosa-plate",
    type: "Restaurant",
    category: "Starters",
    name: "Samosa Plate",
    description: "Crisp potato samosas with chutneys.",
    price: 5.99,
    badge: "Desi Bites",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "chicken-biryani",
    type: "Restaurant",
    category: "Biryani",
    name: "Chicken Biryani",
    description: "Aromatic rice, tender chicken, raita, and salan.",
    price: 13.99,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "paneer-tikka",
    type: "Restaurant",
    category: "Curries",
    name: "Paneer Tikka Masala",
    description: "Paneer in a creamy tomato masala sauce.",
    price: 12.99,
    badge: "Veg",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "masala-dosa",
    type: "Restaurant",
    category: "Dosa",
    name: "Masala Dosa",
    description: "Crispy dosa with potato masala, sambar, and chutney.",
    price: 10.99,
    badge: "Fresh",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "chole-bhature",
    type: "Restaurant",
    category: "Meals",
    name: "Chole Bhature",
    description: "Spiced chickpeas with fluffy bhature.",
    price: 11.99,
    badge: "Favorite",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "mango-lassi",
    type: "Restaurant",
    category: "Drinks",
    name: "Mango Lassi",
    description: "Cool mango yogurt drink for pickup orders.",
    price: 4.49,
    badge: "Drink",
    image: "https://images.unsplash.com/photo-1626201850126-6c6b0e0e2176?auto=format&fit=crop&w=700&q=80"
  }
];

const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getOrders() {
  return readJson(ORDER_KEY, []);
}

function saveOrders(orders) {
  writeJson(ORDER_KEY, orders);
}

function findProduct(id) {
  return products.find((product) => product.id === id);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function orderTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

function orderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  return `IB-${stamp.slice(-6)}`;
}

function itemSummary(items) {
  return items.map((item) => `${item.quantity} x ${item.name}`).join(", ");
}

function setMinPickupTime() {
  const input = document.querySelector('input[name="pickup"]');
  if (!input) return;
  const date = new Date(Date.now() + 45 * 60 * 1000);
  date.setSeconds(0, 0);
  input.min = date.toISOString().slice(0, 16);
}

function initShop() {
  const productGrid = document.querySelector("[data-product-grid]");
  const tabs = document.querySelector("[data-category-tabs]");
  const sort = document.querySelector("#sort-products");
  const search = document.querySelector("#site-search");
  const cartDrawer = document.querySelector("[data-cart-drawer]");
  const scrim = document.querySelector("[data-scrim]");
  const cartItems = document.querySelector("[data-cart-items]");
  const cartCount = document.querySelector("[data-cart-count]");
  const cartTotal = document.querySelector("[data-cart-total]");
  const checkoutForm = document.querySelector("[data-checkout-form]");
  const dialog = document.querySelector("[data-order-dialog]");
  const orderMessage = document.querySelector("[data-order-message]");
  const copyButton = document.querySelector("[data-copy-order]");
  let lastOrderText = "";

  const categories = ["All", "Grocery", "Restaurant", ...Array.from(new Set(products.map((item) => item.category)))];
  let activeCategory = "All";
  let cart = readJson(CART_KEY, []);

  function persistCart() {
    writeJson(CART_KEY, cart);
  }

  function renderTabs() {
    tabs.innerHTML = categories
      .map(
        (category) => `
          <button type="button" class="${category === activeCategory ? "is-active" : ""}" data-category="${escapeHtml(category)}">
            ${escapeHtml(category)}
          </button>
        `
      )
      .join("");
  }

  function filteredProducts() {
    const query = (search.value || "").trim().toLowerCase();
    const sortMode = sort.value;
    let list = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.type === activeCategory ||
        product.category === activeCategory;
      const haystack = `${product.name} ${product.description} ${product.category} ${product.type}`.toLowerCase();
      return matchesCategory && haystack.includes(query);
    });

    if (sortMode === "price-low") {
      list = list.slice().sort((a, b) => a.price - b.price);
    }
    if (sortMode === "price-high") {
      list = list.slice().sort((a, b) => b.price - a.price);
    }

    return list;
  }

  function renderProducts() {
    const list = filteredProducts();
    productGrid.innerHTML = list.length
      ? list
          .map(
            (product) => `
              <article class="product-card">
                <img src="${product.image}" alt="${escapeHtml(product.name)}">
                <div class="product-body">
                  <span class="badge">${escapeHtml(product.badge)}</span>
                  <div class="product-meta">
                    <strong>${escapeHtml(product.name)}</strong>
                    <span class="price">${formatMoney.format(product.price)}</span>
                  </div>
                  <p>${escapeHtml(product.description)}</p>
                  <button class="primary-button" type="button" data-add="${product.id}">Add to cart</button>
                </div>
              </article>
            `
          )
          .join("")
      : `<div class="empty-state">No items match that search yet.</div>`;
  }

  function addToCart(id) {
    const product = findProduct(id);
    if (!product) return;
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id,
        name: product.name,
        type: product.type,
        category: product.category,
        price: product.price,
        quantity: 1
      });
    }
    persistCart();
    renderCart();
    openCart();
  }

  function updateQuantity(id, delta) {
    cart = cart
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
      .filter((item) => item.quantity > 0);
    persistCart();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    persistCart();
    renderCart();
  }

  function renderCart() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    cartTotal.textContent = formatMoney.format(orderTotal(cart));

    cartItems.innerHTML = cart.length
      ? cart
          .map(
            (item) => `
              <article class="cart-line">
                <div class="cart-line-top">
                  <span class="cart-line-title">${escapeHtml(item.name)}</span>
                  <strong>${formatMoney.format(item.price * item.quantity)}</strong>
                </div>
                <div class="cart-line-actions">
                  <div class="quantity-controls" aria-label="Quantity controls for ${escapeHtml(item.name)}">
                    <button type="button" data-minus="${item.id}" aria-label="Decrease ${escapeHtml(item.name)}">-</button>
                    <strong>${item.quantity}</strong>
                    <button type="button" data-plus="${item.id}" aria-label="Increase ${escapeHtml(item.name)}">+</button>
                  </div>
                  <button class="remove-button" type="button" data-remove="${item.id}">Remove</button>
                </div>
              </article>
            `
          )
          .join("")
      : `<div class="empty-state">Your cart is empty. Add grocery or restaurant items to start an order.</div>`;
  }

  function openCart() {
    cartDrawer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
    scrim.hidden = false;
  }

  function closeCart() {
    cartDrawer.classList.remove("is-open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");
    scrim.hidden = true;
  }

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderTabs();
    renderProducts();
  });

  productGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");
    if (button) addToCart(button.dataset.add);
  });

  cartItems.addEventListener("click", (event) => {
    const plus = event.target.closest("[data-plus]");
    const minus = event.target.closest("[data-minus]");
    const remove = event.target.closest("[data-remove]");
    if (plus) updateQuantity(plus.dataset.plus, 1);
    if (minus) updateQuantity(minus.dataset.minus, -1);
    if (remove) removeFromCart(remove.dataset.remove);
  });

  document.querySelector("[data-open-cart]").addEventListener("click", openCart);
  document.querySelector("[data-close-cart]").addEventListener("click", closeCart);
  scrim.addEventListener("click", closeCart);
  search.addEventListener("input", renderProducts);
  sort.addEventListener("change", renderProducts);

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!cart.length) {
      openCart();
      return;
    }

    const form = new FormData(checkoutForm);
    const newOrder = {
      id: orderId(),
      createdAt: new Date().toISOString(),
      status: "New",
      source: "Website pickup",
      customer: {
        name: String(form.get("name") || "").trim(),
        phone: String(form.get("phone") || "").trim()
      },
      pickup: String(form.get("pickup") || ""),
      notes: String(form.get("notes") || "").trim(),
      items: cart.map((item) => ({ ...item })),
      total: orderTotal(cart)
    };

    const orders = getOrders();
    saveOrders([newOrder, ...orders]);
    lastOrderText = buildOrderText(newOrder);
    orderMessage.textContent = `${newOrder.id} was saved. Staff can see it on the orders page on this device.`;
    cart = [];
    persistCart();
    checkoutForm.reset();
    setMinPickupTime();
    renderCart();
    closeCart();
    dialog.showModal();
  });

  copyButton.addEventListener("click", async () => {
    if (!lastOrderText) return;
    await navigator.clipboard.writeText(lastOrderText);
    copyButton.textContent = "Copied";
    setTimeout(() => {
      copyButton.textContent = "Copy order";
    }, 1600);
  });

  document.querySelector("[data-close-dialog]").addEventListener("click", () => {
    dialog.close();
  });

  setMinPickupTime();
  renderTabs();
  renderProducts();
  renderCart();
}

function buildOrderText(order) {
  return [
    `Order ${order.id}`,
    `Customer: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Pickup: ${formatDateTime(order.pickup)}`,
    `Items: ${itemSummary(order.items)}`,
    `Estimated total: ${formatMoney.format(order.total)}`,
    order.notes ? `Notes: ${order.notes}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function formatDateTime(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

async function hashPassword(value) {
  const text = String(value);
  if (window.crypto && window.crypto.subtle) {
    const bytes = new TextEncoder().encode(text);
    const digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(index);
    hash |= 0;
  }
  return `fallback-${hash}`;
}

function initAdmin() {
  const authPanel = document.querySelector("[data-auth-panel]");
  const dashboard = document.querySelector("[data-admin-dashboard]");
  const loginForm = document.querySelector("[data-login-form]");
  const setupForm = document.querySelector("[data-setup-form]");
  const authTitle = document.querySelector("[data-auth-title]");
  const authCopy = document.querySelector("[data-auth-copy]");
  const loginMessage = document.querySelector("[data-login-message]");
  const setupMessage = document.querySelector("[data-setup-message]");
  const signOut = document.querySelector("[data-sign-out]");
  const ordersList = document.querySelector("[data-orders-list]");
  const statsGrid = document.querySelector("[data-stats-grid]");
  const searchInput = document.querySelector("[data-admin-search]");
  const statusFilter = document.querySelector("[data-status-filter]");
  const manualForm = document.querySelector("[data-manual-order-form]");
  const manualMessage = document.querySelector("[data-manual-message]");
  const passwordForm = document.querySelector("[data-password-form]");
  const passwordMessage = document.querySelector("[data-password-message]");

  let adminSearch = "";
  let adminStatus = "All";

  function needsSetup() {
    return !localStorage.getItem(PASSWORD_KEY);
  }

  function showSetup() {
    authTitle.textContent = "Create staff password";
    authCopy.textContent = "This first version stores the password on this browser for the demo.";
    loginForm.hidden = true;
    setupForm.hidden = false;
  }

  function showLogin() {
    authTitle.textContent = "Unlock orders";
    authCopy.textContent = "Enter the staff password to view and update pickup orders.";
    loginForm.hidden = false;
    setupForm.hidden = true;
  }

  function unlock() {
    sessionStorage.setItem(AUTH_KEY, "true");
    authPanel.hidden = true;
    dashboard.hidden = false;
    signOut.hidden = false;
    renderAdmin();
  }

  function lock() {
    sessionStorage.removeItem(AUTH_KEY);
    authPanel.hidden = false;
    dashboard.hidden = true;
    signOut.hidden = true;
    if (needsSetup()) showSetup();
    else showLogin();
  }

  setupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(setupForm);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    if (password !== confirm) {
      setupMessage.textContent = "Passwords do not match.";
      return;
    }
    localStorage.setItem(PASSWORD_KEY, await hashPassword(password));
    setupMessage.textContent = "Password saved.";
    setupForm.reset();
    unlock();
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(loginForm);
    const savedHash = localStorage.getItem(PASSWORD_KEY);
    const enteredHash = await hashPassword(form.get("password"));
    if (enteredHash === savedHash) {
      loginForm.reset();
      loginMessage.textContent = "";
      unlock();
    } else {
      loginMessage.textContent = "That password did not work.";
    }
  });

  signOut.addEventListener("click", lock);

  searchInput.addEventListener("input", () => {
    adminSearch = searchInput.value.trim().toLowerCase();
    renderOrders();
  });

  statusFilter.addEventListener("change", () => {
    adminStatus = statusFilter.value;
    renderOrders();
  });

  ordersList.addEventListener("change", (event) => {
    const select = event.target.closest("[data-order-status]");
    if (!select) return;
    const orders = getOrders().map((order) =>
      order.id === select.dataset.orderStatus ? { ...order, status: select.value } : order
    );
    saveOrders(orders);
    renderAdmin();
  });

  manualForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(manualForm);
    const rawItems = String(form.get("items") || "").trim();
    const total = Number(form.get("total") || 0);
    const newOrder = {
      id: orderId(),
      createdAt: new Date().toISOString(),
      status: "New",
      source: "Staff manual entry",
      customer: {
        name: String(form.get("name") || "").trim(),
        phone: String(form.get("phone") || "").trim()
      },
      pickup: String(form.get("pickup") || ""),
      notes: rawItems,
      items: [
        {
          id: "manual-entry",
          name: rawItems,
          type: "Manual",
          category: "Manual",
          price: total,
          quantity: 1
        }
      ],
      total
    };
    saveOrders([newOrder, ...getOrders()]);
    manualForm.reset();
    setMinPickupTime();
    manualMessage.textContent = `${newOrder.id} saved.`;
    renderAdmin();
  });

  passwordForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(passwordForm);
    const currentHash = await hashPassword(form.get("current"));
    const savedHash = localStorage.getItem(PASSWORD_KEY);
    if (currentHash !== savedHash) {
      passwordMessage.textContent = "Current password is not correct.";
      return;
    }
    localStorage.setItem(PASSWORD_KEY, await hashPassword(form.get("next")));
    passwordForm.reset();
    passwordMessage.textContent = "Password updated.";
  });

  document.querySelector("[data-seed-orders]").addEventListener("click", seedOrders);
  document.querySelector("[data-export-orders]").addEventListener("click", exportOrders);

  function filteredOrders() {
    return getOrders().filter((order) => {
      const matchesStatus = adminStatus === "All" || order.status === adminStatus;
      const haystack = [
        order.id,
        order.status,
        order.customer.name,
        order.customer.phone,
        order.notes,
        itemSummary(order.items)
      ]
        .join(" ")
        .toLowerCase();
      return matchesStatus && haystack.includes(adminSearch);
    });
  }

  function renderStats() {
    const orders = getOrders();
    const totalSales = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const ready = orders.filter((order) => order.status === "Ready").length;
    const open = orders.filter((order) => !["Completed", "Cancelled"].includes(order.status)).length;
    const cards = [
      ["Open", open],
      ["Ready", ready],
      ["Orders", orders.length],
      ["Estimated sales", formatMoney.format(totalSales)]
    ];

    statsGrid.innerHTML = cards
      .map(
        ([label, value]) => `
          <article class="stat-card">
            <strong>${escapeHtml(value)}</strong>
            <span>${escapeHtml(label)}</span>
          </article>
        `
      )
      .join("");
  }

  function renderOrders() {
    const orders = filteredOrders();
    ordersList.innerHTML = orders.length
      ? orders
          .map(
            (order) => `
              <article class="order-row">
                <div>
                  <span class="status-pill ${escapeHtml(order.status)}">${escapeHtml(order.status)}</span>
                  <h3>${escapeHtml(order.id)} - ${escapeHtml(order.customer.name)}</h3>
                  <small>${escapeHtml(order.customer.phone)} | Pickup ${escapeHtml(formatDateTime(order.pickup))}</small>
                  <p>${escapeHtml(order.source || "Website pickup")}</p>
                </div>
                <div>
                  <ol class="order-items">
                    ${order.items
                      .map(
                        (item) => `
                          <li>${escapeHtml(item.quantity)} x ${escapeHtml(item.name)}</li>
                        `
                      )
                      .join("")}
                  </ol>
                  ${order.notes ? `<p><strong>Notes:</strong> ${escapeHtml(order.notes)}</p>` : ""}
                </div>
                <strong>${formatMoney.format(Number(order.total || 0))}</strong>
                <select class="status-select" data-order-status="${escapeHtml(order.id)}" aria-label="Order status for ${escapeHtml(order.id)}">
                  ${["New", "Preparing", "Ready", "Completed", "Cancelled"]
                    .map((status) => `<option value="${status}" ${status === order.status ? "selected" : ""}>${status}</option>`)
                    .join("")}
                </select>
              </article>
            `
          )
          .join("")
      : `<div class="empty-state">No orders match this view yet.</div>`;
  }

  function renderAdmin() {
    renderStats();
    renderOrders();
  }

  function seedOrders() {
    const now = new Date();
    const future = new Date(now.getTime() + 75 * 60 * 1000).toISOString().slice(0, 16);
    const sample = {
      id: orderId(),
      createdAt: now.toISOString(),
      status: "New",
      source: "Sample order",
      customer: {
        name: "Sample Customer",
        phone: "(763) 555-0188"
      },
      pickup: future,
      notes: "Medium spice. Please keep grocery items separate.",
      items: [
        { ...products.find((item) => item.id === "chicken-biryani"), quantity: 2 },
        { ...products.find((item) => item.id === "samosa-plate"), quantity: 1 },
        { ...products.find((item) => item.id === "basmati-rice"), quantity: 1 }
      ].map((item) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        category: item.category,
        price: item.price,
        quantity: item.quantity
      }))
    };
    sample.total = orderTotal(sample.items);
    saveOrders([sample, ...getOrders()]);
    renderAdmin();
  }

  function exportOrders() {
    const orders = getOrders();
    const header = ["Order ID", "Status", "Name", "Phone", "Pickup", "Items", "Notes", "Total"];
    const rows = orders.map((order) => [
      order.id,
      order.status,
      order.customer.name,
      order.customer.phone,
      formatDateTime(order.pickup),
      itemSummary(order.items),
      order.notes || "",
      Number(order.total || 0).toFixed(2)
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "indian-bazaar-orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  setMinPickupTime();
  if (sessionStorage.getItem(AUTH_KEY) === "true" && !needsSetup()) unlock();
  else lock();
}

const page = document.body.dataset.page;
if (page === "shop") initShop();
if (page === "admin") initAdmin();
