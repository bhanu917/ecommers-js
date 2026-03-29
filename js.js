

fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("allproducts", JSON.stringify(data));

        showdata();
    });

let allp = document.getElementById("allp");
let mensp = document.getElementById("mensp");
let womensp = document.getElementById("womensp");
let jewerlyp = document.getElementById("jewerlyp");
let electronicp = document.getElementById("electronicp");

allp.addEventListener("click", () => { showdata() });
mensp.addEventListener("click", () => showdata("men's clothing"));
womensp.addEventListener("click", () => showdata("women's clothing"));
jewerlyp.addEventListener("click", () => showdata("jewelery"));
electronicp.addEventListener("click", () => showdata("electronics"));








let prodcontainer = document.getElementById("prod-container");
function showdata(category) {
    let allproducts = JSON.parse(localStorage.getItem("allproducts"));

    if (category) {
        allproducts = allproducts.filter(p => p.category === category);
    }
    prodcontainer.innerHTML = "";

    allproducts.forEach(product => {
        let cards = document.createElement("div");
        cards.className = "prod-card";
        cards.innerHTML = `
        <div class="imgid">
            <img src="${product.image}" width="250" height="300">
        </div>
        <div class="p-content">
            <p style="margin-top:20px;font-size:20px"><b>${product.title.substring(0, 25)}...</b></p>
            <p>${product.description.substring(0, 80)}...</p>
            <hr style="width:80%;margin-left:9%">
            <p><b>${product.price}$</b></p>
            <hr style="width:80%;margin-left:9%">
            <p class="card-butts">
                <button>details</button>
                <button class="cart-butt">add to cart</button>
            </p>
        </div>
    `;

        prodcontainer.append(cards);

        // select the button inside this card
        let cartbutt = cards.querySelector(".cart-butt");
        cartbutt.addEventListener("click", () => {
            let cartprod = JSON.parse(localStorage.getItem("cartprods")) || [];
            cartprod.push(product);
            localStorage.setItem("cartprods", JSON.stringify(cartprod));
            console.log("Cart updated:", cartprod);
        });
    });

}
