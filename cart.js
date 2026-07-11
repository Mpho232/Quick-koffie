function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    cart.push({ name: name, price: price });
    localStorage.setItem('coffeeCart', JSON.stringify(cart));
    alert(name + " ($" + price.toFixed(2) + ") has been added to your cart!");
}

function displayCart() {
    const cartList = document.getElementById('cart-items-list');
    const totalDisplay = document.getElementById('cart-total-price');
    if (!cartList) return;
    
    const cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    
    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty. Go explore the menu!</p>";
        if (totalDisplay) totalDisplay.innerText = "$0.00";
        return;
    }
    
    cartList.innerHTML = "";
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        const itemCard = document.createElement('article');
        itemCard.className = "product-card";
        itemCard.style.marginBottom = "1rem";
        itemCard.innerHTML = `
            <h4>${item.name}</h4>
            <p style="font-weight: bold; color: #e8c595; margin: 0;">Cost: $${item.price.toFixed(2)}</p>
        `;
        cartList.appendChild(itemCard);
    });
    
    if (totalDisplay) {
        totalDisplay.innerText = "$" + total.toFixed(2);
    }
}

function clearCart() {
    localStorage.removeItem('coffeeCart');
    displayCart();
}

document.addEventListener("DOMContentLoaded", displayCart);
