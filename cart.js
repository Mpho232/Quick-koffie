function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    cart.push({ name: name, price: price });
    localStorage.setItem('coffeeCart', JSON.stringify(cart));
    alert(name + " (BWP" + price.toFixed(2) + ") has been added to your cart!");
}

function displayCart() {
    const cartList = document.getElementById('cart-items-list');
    const totalDisplay = document.getElementById('cart-total-price');
    if (!cartList) return;
    
    const cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    
    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty. Go explore the menu!</p>";
        if (totalDisplay) totalDisplay.innerText = "BWP0.00";
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
            <h4>BWP{item.name}</h4>
            <p style="font-weight: bold; color: #e8c595; margin: 0;">Cost: BWPBWP{item.price.toFixed(2)}</p>
        `;
        cartList.appendChild(itemCard);
    });
    
    if (totalDisplay) {
        totalDisplay.innerText = "BWP" + total.toFixed(2);
    }
}

function clearCart() {
    localStorage.removeItem('coffeeCart');
    displayCart();
}

function checkoutToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    
    if (cart.length === 0) {
        alert("Your cart is empty! Add some coffee before checking out.");
        return;
    }
    
    const phoneNumber = "26773214110"; 
    
    let message = "☕ *New Quick Koffiee Order* ☕\n\n";
    let total = 0;
    
    cart.forEach((item, index) => {
        message += (index + 1) + ". " + item.name + " - BWP" + item.price.toFixed(2) + "\n";
        total += item.price;
    });
    
    message += "\n💰 *Total Bill:* BWP" + total.toFixed(2) + "\n\nThank you for ordering with Quick Koffiee!";
    
    const whatsappURL = "https://api.whatsapp.com/send?phone=" + phoneNumber + "&text=" + encodeURIComponent(message);
    
    window.open(whatsappURL, '_blank');
}

document.addEventListener("DOMContentLoaded", displayCart);
