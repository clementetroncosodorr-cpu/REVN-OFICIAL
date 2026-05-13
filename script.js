// ======================
// REVN SCRIPT FINAL
// ======================

// PRODUCTOS

const products = [

{
name:"REVN BASIC",
price:21990,
images:[
"activos/basic1.png",
"activos/basic2.png"
]
},

{
name:"REVN DICE",
price:25990,
images:[
"activos/dice1.png",
"activos/dice2.png"
]
},

{
name:"REVN BUTTERFLY",
price:25990,
images:[
"activos/butterfly1.png",
"activos/butterfly2.png"
]
},

{
name:"REVN TEDDY",
price:25990,
images:[
"activos/teddy1.png",
"activos/teddy2.png"
]
}

];

// ======================
// VARIABLES
// ======================

let currentProduct = null;
let currentImage = 0;
let cart = [];

// ======================
// MODAL
// ======================

function openModal(index){

currentProduct = products[index];

currentImage = 0;

document.getElementById("modal").style.display = "flex";

document.body.classList.add("modal-open");

updateModal();

}

function closeModal(){

document.getElementById("modal").style.display = "none";

document.body.classList.remove("modal-open");

}

// ======================
// UPDATE MODAL
// ======================

function updateModal(){

document.getElementById("modalImage").src =
currentProduct.images[currentImage];

document.getElementById("modalTitle").innerText =
currentProduct.name;

document.getElementById("modalPrice").innerText =
"$" + currentProduct.price.toLocaleString("es-CL");

}

// ======================
// SLIDER
// ======================

function nextImage(){

currentImage++;

if(currentImage >= currentProduct.images.length){

currentImage = 0;

}

updateModal();

}

function prevImage(){

currentImage--;

if(currentImage < 0){

currentImage = currentProduct.images.length - 1;

}

updateModal();

}

// ======================
// TALLAS
// ======================

let selectedSize = "M";

function selectSize(btn,size){

selectedSize = size;

document.querySelectorAll(".sizes button")
.forEach(button => {

button.classList.remove("active");

});

btn.classList.add("active");

}

// ======================
// CARRITO
// ======================

function addToCart(){

cart.push({

name:currentProduct.name,
price:currentProduct.price,
image:currentProduct.images[0],
size:selectedSize

});

renderCart();

closeModal();

toggleCart();

}

function removeFromCart(index){

cart.splice(index,1);

renderCart();

}

function renderCart(){

const cartItems = document.getElementById("cartItems");

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.image}">

<div>

<h4>${item.name}</h4>

<p>Talla: ${item.size}</p>

<p>$${item.price.toLocaleString("es-CL")}</p>

</div>

<button onclick="removeFromCart(${index})">
X
</button>

</div>

`;

});

document.getElementById("cartTotal").innerText =
"$" + total.toLocaleString("es-CL");

document.getElementById("cartCount").innerText =
cart.length;

}

// ======================
// TOGGLE CART
// ======================

function toggleCart(){

document.getElementById("cart")
.classList.toggle("open");

}

// ======================
// CHECKOUT
// ======================

function checkout(){

if(cart.length === 0){

alert("Tu carrito está vacío");

return;

}

alert("Próximamente pagos online 🔥");

}

// ======================
// PROFILE
// ======================

function toggleProfile(){

document.getElementById("profileMenu")
.classList.toggle("show-profile");

}

// ======================
// LOGIN
// ======================

function closeLogin(){

document.getElementById("loginOverlay")
.style.display = "none";

document.body.classList.remove("modal-open");

}

function continueGuest(){

closeLogin();

}

function login(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

if(email === "" || password === ""){

alert("Completa todos los campos");

return;

}

alert("Inicio de sesión exitoso 🔥");

closeLogin();

}

function register(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

if(email === "" || password === ""){

alert("Completa todos los campos");

return;

}

alert("Cuenta creada 🔥");

closeLogin();

}

function forgotPassword(){

const email =
document.getElementById("email").value;

if(email === ""){

alert("Ingresa tu correo");

return;

}

alert("Correo de recuperación enviado 🔥");

}

// ======================
// FIX SCROLL
// ======================

window.onload = () => {

document.body.classList.remove("modal-open");

document.body.style.overflow = "auto";

};
