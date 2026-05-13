const products=[
{name:"BASIC REVN",price:21990,images:["activos/basic-front.jpg","activos/basic-back.jpg"]},
{name:"LOST TEDDY",price:21990,images:["activos/teddy-front.jpg","activos/teddy-back.jpg"]},
{name:"LOST DICE",price:25990,images:["activos/dice-front.jpg","activos/dice-back.jpg"]},
{name:"REBIRTH",price:25990,images:["activos/rebirth-front.jpg","activos/rebirth-back.jpg"]}
];

const productsDiv=document.getElementById("productos");

products.forEach((p,index)=>{
productsDiv.innerHTML+=`
<div class='card'>
<img src='${p.images[0]}'>
<div class='content'>
<h2>${p.name}</h2>
<div class='price'>$${p.price.toLocaleString("es-CL")}</div>
<button onclick='openProduct(${index})'>VER</button>
</div>
</div>`;
});

let currentProduct=null;
let currentSlide=0;
let selectedSize="M";

function openProduct(index){

currentProduct=products[index];
currentSlide=0;

document.getElementById("modal").style.display="flex";

document.getElementById("title").innerText=currentProduct.name;

document.getElementById("price").innerText="$"+currentProduct.price.toLocaleString("es-CL");

updateSlide();

}

function closeModal(){

document.getElementById("modal").style.display="none";

}

function updateSlide(){

document.getElementById("slider-img").src=currentProduct.images[currentSlide];

}

function nextSlide(){

currentSlide=(currentSlide+1)%currentProduct.images.length;

updateSlide();

}

function prevSlide(){

currentSlide=(currentSlide-1+currentProduct.images.length)%currentProduct.images.length;

updateSlide();

}

function selectSize(btn){

document.querySelectorAll(".sizes button").forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

selectedSize=btn.innerText;

}

let cart = JSON.parse(localStorage.getItem("revnCart")) || [];

function addToCart(){

cart.push({

name:currentProduct.name,
price:currentProduct.price,
size:selectedSize,
image:currentProduct.images[0]

});

localStorage.setItem("revnCart",JSON.stringify(cart));

renderCart();

}

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("revnCart",JSON.stringify(cart));

renderCart();

}

function renderCart(){

let total=0;

const items=document.getElementById("cart-items");

items.innerHTML="";

cart.forEach((item,index)=>{

total+=item.price;

items.innerHTML+=`

<div class='cart-item'>

<img src='${item.image}'>

<div>

<strong>${item.name}</strong><br>

Talla: ${item.size}<br>

$${item.price.toLocaleString("es-CL")}

</div>

<button onclick='removeItem(${index})'>X</button>

</div>

`;

});

document.getElementById("total").innerText="$"+total.toLocaleString("es-CL");

document.getElementById("cart-count").innerText=cart.length;

}

function toggleCart(){

document.getElementById("cart").classList.toggle("open");

}

function buyNow(){

const msg=`Hola REVN quiero comprar:%0A%0A${currentProduct.name}%0ATalla: ${selectedSize}`;

window.open(`https://wa.me/56942361269?text=${msg}`);

}

function checkout(){

let msg="Hola REVN quiero comprar:%0A%0A";

cart.forEach(item=>{

msg+=`${item.name} - ${item.size}%0A`;

});

window.open(`https://wa.me/56942361269?text=${msg}`);

}

function continueGuest(){

document.getElementById("register-modal").style.display="none";

}

function checkUser(){

const user=localStorage.getItem("revnUser");

if(user){

document.getElementById("user-email").innerText=user;

document.getElementById("register-modal").style.display="none";

}

}

function toggleProfile(){

document.getElementById("profile-menu").classList.toggle("show-profile");

}

renderCart();

checkUser();