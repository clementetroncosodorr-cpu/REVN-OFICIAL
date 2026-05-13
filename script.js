// ======================
// REVN SCRIPT FINAL
// ======================

// PRODUCTOS

const products = [

{
name:"REVN BASIC",
price:21990,
images:[
"activos/basic-front.jpg",
"activos/basic-back.jpg"
]
},

{
name:"REVN DICE",
price:25990,
images:[
"activos/dice-front.jpg",
"activos/dice-back.jpg"
]
},

{
name:"REVN BUTTERFLY",
price:25990,
images:[
"activos/butterfly-front.jpg",
"activos/butterfly-back.jpg"
]
},

{
name:"REVN TEDDY",
price:25990,
images:[
"activos/teddy-front.jpg",
"activos/teddy-back.jpg"
]
}

];

// ======================
// VARIABLES
// ======================

let currentProduct = null;
let currentSlide = 0;
let selectedSize = "M";

let cart =
JSON.parse(localStorage.getItem("revnCart")) || [];

// ======================
// PRODUCTOS HOME
// ======================

const productsDiv =
document.getElementById("productos");

if(productsDiv){

products.forEach((p,index)=>{

productsDiv.innerHTML += `

<div class='card'>

<img src='${p.images[0]}'>

<div class='content'>

<h2>${p.name}</h2>

<div class='price'>
$${p.price.toLocaleString("es-CL")}
</div>

<button onclick='openProduct(${index})'>
VER
</button>

</div>

</div>

`;

});

}

// ======================
// MODAL
// ======================

function openProduct(index){

currentProduct = products[index];

currentSlide = 0;

document.getElementById("modal")
.style.display = "flex";

updateSlide();

}

function closeModal(){

document.getElementById("modal")
.style.display = "none";

}

// ======================
// SLIDER
// ======================

function updateSlide(){

document.getElementById("slider-img")
.src = currentProduct.images[currentSlide];

document.getElementById("title")
.innerText = currentProduct.name;

document.getElementById("price")
.innerText =
"$" + currentProduct.price.toLocaleString("es-CL");

}

function nextSlide(){

currentSlide++;

if(currentSlide >= currentProduct.images.length){

currentSlide = 0;

}

updateSlide();

}

function prevSlide(){

currentSlide--;

if(currentSlide < 0){

currentSlide =
currentProduct.images.length - 1;

}

updateSlide();

}

// ======================
// TALLAS
// ======================

function selectSize(btn){

document.querySelectorAll(".sizes button")
.forEach(button=>{

button.classList.remove("active");

});

btn.classList.add("active");

selectedSize = btn.innerText;

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

localStorage.setItem(
"revnCart",
JSON.stringify(cart)
);

renderCart();

closeModal();

toggleCart();

}

function removeItem(index){

cart.splice(index,1);

localStorage.setItem(
"revnCart",
JSON.stringify(cart)
);

renderCart();

}

function renderCart(){

const items =
document.getElementById("cart-items");

if(!items) return;

items.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

items.innerHTML += `

<div class='cart-item'>

<img src='${item.image}'>

<div>

<strong>${item.name}</strong><br>

Talla: ${item.size}<br>

$${item.price.toLocaleString("es-CL")}

</div>

<button onclick='removeItem(${index})'>
X
</button>

</div>

`;

});

document.getElementById("total")
.innerText =
"$" + total.toLocaleString("es-CL");

document.getElementById("cart-count")
.innerText = cart.length;

}

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

let msg =
"Hola REVN quiero comprar:%0A%0A";

cart.forEach(item=>{

msg +=
`${item.name} - ${item.size}%0A`;

});

window.open(
`https://wa.me/56942361269?text=${msg}`
);

}

// ======================
// PROFILE
// ======================

function toggleProfile(){

document.getElementById("profile-menu")
.classList.toggle("show-profile");

}

function logoutUser(){

localStorage.removeItem("revnUser");

location.reload();

}

// ======================
// LOGIN
// ======================

function closeLogin(){

document.getElementById("register-modal")
.style.display = "none";

document.body.style.overflow = "auto";

}

function continueGuest(){

localStorage.setItem("revnUser","guest");

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

localStorage.setItem("revnUser",email);

const btn =
document.querySelector(".login-btn");

btn.innerText = "ENTRANDO...";

setTimeout(()=>{

closeLogin();

btn.innerText = "INICIAR SESIÓN";

},1500);

}

localStorage.setItem("revnUser",email);

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

localStorage.setItem("revnUser",email);

closeLogin();

}

function forgotPassword(){

const email =
document.getElementById("email").value;

if(email === ""){

alert("Ingresa tu correo");

return;

}

alert("Correo enviado 🔥");

}

// ======================
// LOAD
// ======================

window.onload = () => {

document.body.style.overflow = "auto";

renderCart();

const user =
localStorage.getItem("revnUser");

if(user){

document.getElementById("register-modal")
.style.display = "none";

document.getElementById("user-email")
.innerText = user;

}else{

document.getElementById("register-modal")
.style.display = "flex";

}

};
