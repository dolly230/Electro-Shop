// LOGIN FUNCTION
function loginUser() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "admin" && pass === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials! Try user: admin | pass: 1234");
  }
}

// CHECK LOGIN ON HOME PAGE
function checkLogin() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
  }
  updateCartCount();
}

// LOGOUT FUNCTION
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("cart");
  window.location.href = "login.html";
}

// ADD TO CART
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  updateCartCount();
}

// UPDATE CART COUNT
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").innerText = cart.length;
}

// LOAD CART PAGE
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let html = "";
  let total = 0;
  cart.forEach((item) => {
    html += `
    <div class="col-md-4 col-sm-6 mb-3">
      <div class="card">
        <img src="assets/${item.image}" class="card-img-top" style="height:200px;object-fit:cover;">
        <div class="card-body text-center">
          <h5>${item.name}</h5>
          <p>₹${item.price}</p>
        </div>
      </div>
    </div>`;
    total += item.price;
  });
  document.getElementById("cartItems").innerHTML = html || "<p class='text-center'>Cart is empty!</p>";
  document.getElementById("totalPrice").innerText = total;
}
