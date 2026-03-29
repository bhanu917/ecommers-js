// // ================== ADD TO CART ==================
// function addToCart(product) {
//     let carts = JSON.parse(localStorage.getItem("cartprods")) || [];

//     // ✅ check only by id (must be unique per product)
//     let existingIndex = carts.findIndex(item => item.id === product.id);

//     if (existingIndex !== -1) {
//         // product already exists → increase qty
//         carts[existingIndex].qty = (carts[existingIndex].qty || 1) + 1;
//     } else {
//         // product not in cart → add new with qty = 1
//         carts.push({ ...product, qty: 1 });
//     }

//     localStorage.setItem("cartprods", JSON.stringify(carts));
//     cartdisp(); // refresh cart display immediately
// }

// ================== DISPLAY CART ==================
function cartdisp() {
    let carts = JSON.parse(localStorage.getItem("cartprods")) || [];

    // ✅ remove duplicates by id and sum qty
    let uniqueCarts = [];

    carts.forEach(item => {
        let existingIndex = uniqueCarts.findIndex(prod => prod.id === item.id);
        if (existingIndex !== -1) {
            // if duplicate found, add quantities together
            uniqueCarts[existingIndex].qty += (item.qty || 1);
        } else {
            uniqueCarts.push({ ...item, qty: item.qty || 1 });
        }
    });

    // overwrite localStorage with cleaned cart
    localStorage.setItem("cartprods", JSON.stringify(uniqueCarts));

    // now use uniqueCarts instead of carts
    carts = uniqueCarts;


    let defaultcart = document.getElementById("default-cart");
    let cartdispprod = document.getElementById("cartdispprod");
    let totalprice = document.getElementById("totalprice");
    let cartpage = document.getElementById("cart-page");

    // ✅ clear UI
    cartdispprod.innerHTML = "";
    totalprice.innerHTML = "";

    // empty cart
    if (carts.length === 0) {
        defaultcart.style.display = "block";
        cartpage.style.display = "none";
        return;
    } else {
        defaultcart.style.display = "none";
        cartpage.style.display = "block";
    }

    // ================== PRODUCTS ==================
    carts.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "card mb-3 p-3 shadow-sm";

        div.innerHTML = `
        <div class="d-flex align-items-center justify-content-between w-100">

            <!-- IMAGE -->
            <div style="width: 15%;">
                <img src="${item.image}" class="img-fluid" style="max-width:120px;" />
            </div>

            <!-- TITLE -->
            <div style="width: 40%;margin-left:80px" class="text-start">
                <h6>${item.title}</h6>
            </div>

            <!-- QTY -->
            <div style="width: 20%;" class="d-flex justify-content-evenly align-items-center">
                <button class="btn btn-sm btn-secondary" onclick="decreaseQty(${index})">-</button>
                <span class="fw-bold">${item.qty || 1}</span>
                <button class="btn btn-sm btn-secondary" onclick="increaseQty(${index})">+</button>
            </div>

            <!-- SUBTOTAL -->
            <div style="width: 25%;" class="text-end">
                <h6>${item.qty || 1} × $${item.price} = $${(item.qty || 1) * item.price}</h6>
            </div>

        </div>
        `;

        cartdispprod.appendChild(div);
    });

    // ================== TOTAL ==================
    let total = carts.reduce((sum, item) => {
        return sum + item.price * (item.qty || 1);
    }, 0);

    let totalDiv = document.createElement("h4");
    totalDiv.className = "text-end me-3 mt-4";
    totalDiv.innerText = "Total: ₹ " + total;

    totalprice.appendChild(totalDiv);
}

// ================== INCREASE ==================
function increaseQty(index) {
    let carts = JSON.parse(localStorage.getItem("cartprods")) || [];

    carts[index].qty = (carts[index].qty || 1) + 1;

    localStorage.setItem("cartprods", JSON.stringify(carts));
    cartdisp();
}

// ================== DECREASE ==================
function decreaseQty(index) {
    let carts = JSON.parse(localStorage.getItem("cartprods")) || [];

    if ((carts[index].qty || 1) > 1) {
        carts[index].qty -= 1;
    } else {
        carts.splice(index, 1); // remove if qty = 0
    }

    localStorage.setItem("cartprods", JSON.stringify(carts));
    cartdisp();
}

// ================== LOAD ==================
cartdisp();
