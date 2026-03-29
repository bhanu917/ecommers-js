// Get container
let cartpage = document.getElementById("cart-page");

// Display cart
function cartdisp() {
    let carts = JSON.parse(localStorage.getItem("cartprods")) || [];
    let defaultcart = document.getElementById("default-cart");
    let cartdispprod = document.getElementById("cartdispprod");
    let totalprice = document.getElementById("totalprice");

    // ✅ Clear correct containers
    cartdispprod.innerHTML = "";
    totalprice.innerHTML = "";

    // Empty cart check
    if (carts.length === 0) {
        defaultcart.style.display = "block";
        return;
    } else {
        defaultcart.style.display = "none";
    }

    // Show products
    carts.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "card mb-3 p-3";

        div.innerHTML = `
            <div class="row align-items-center text-center w-75 me-5 ms-4">
                
                <div class="col-md-2">
                    <img src="${item.image}" width="100px" class="img-fluid" />
                </div>

                <div class="col-md-3">
                    <h5>${item.title}</h5>
                </div>

                <div class="col-md-2">
                    <p>₹ ${item.price}</p>
                </div>

                <div class="col-md-3">
                    <button class="btn btn-sm btn-secondary" onclick="decreaseQty(${index})">-</button>
                    <span class="mx-2 fw-bold">${item.qty || 1}</span>
                    <button class="btn btn-sm btn-secondary" onclick="increaseQty(${index})">+</button>
                </div>

                <div class="col-md-2">
                    <button class="btn btn-danger" onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>
            </div>
        `;

        cartdispprod.appendChild(div);
    });

    // Total price
    let total = carts.reduce((sum, item) => {
        return sum + item.price * (item.qty || 1);
    }, 0);

    let totalDiv = document.createElement("h4");
    totalDiv.className = "text-end me-5 mt-4";
    totalDiv.innerText = "Total: ₹ " + total;

    totalprice.appendChild(totalDiv);
}

// Increase quantity
function increaseQty(index) {
    let carts = JSON.parse(localStorage.getItem("cartprods")) || [];
    carts[index].qty = (carts[index].qty || 1) + 1;
    localStorage.setItem("cartprods", JSON.stringify(carts));
    cartdisp();
}

// Decrease quantity
function decreaseQty(index) {
    let carts = JSON.parse(localStorage.getItem("cartprods")) || [];

    if ((carts[index].qty || 1) > 1) {
        carts[index].qty -= 1;
    } else {
        carts.splice(index, 1);
    }

    localStorage.setItem("cartprods", JSON.stringify(carts));
    cartdisp();
}

// Remove item completely
function removeItem(index) {
    let carts = JSON.parse(localStorage.getItem("cartprods")) || [];
    carts.splice(index, 1);
    localStorage.setItem("cartprods", JSON.stringify(carts));
    cartdisp();
}

// Call on load
cartdisp();