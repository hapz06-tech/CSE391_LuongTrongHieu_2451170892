function createCart() {
    let items = [];
    let activeDiscount = { type: "none", value: 0 };

    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item && newQuantity > 0) {
                item.quantity = newQuantity;
            }
        },

        getTotal() {
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (activeDiscount.type === "percentage") {
                return subTotal * (1 - activeDiscount.value);
            } else if (activeDiscount.type === "fixed") {
                return Math.max(0, subTotal - activeDiscount.value);
            }
            return subTotal;
        },

        applyDiscount(code) {
            if (code === "SALE10") activeDiscount = { type: "percentage", value: 0.1 };
            else if (code === "SALE20") activeDiscount = { type: "percentage", value: 0.2 };
            else if (code === "FREESHIP") activeDiscount = { type: "fixed", value: 30000 };
        },

        printCart() {
            console.log("┌" + "─".repeat(50) + "┐");
            console.log("│ # │ " + "Sản phẩm".padEnd(14) + " │ SL │ " + "Đơn giá".padEnd(11) + " │ " + "Tổng".padEnd(11) + " │");
            
            items.forEach((item, idx) => {
                const totalStr = (item.price * item.quantity).toLocaleString("vi-VN");
                console.log(`│ ${idx + 1} │ ${item.name.padEnd(14)} │  ${item.quantity} │ ${item.price.toLocaleString("vi-VN").padEnd(11)} │ ${totalStr.padEnd(11)} │`);
            });
            
            console.log("├" + "─".repeat(50) + "┤");
            console.log("│ " + `Tổng cộng: ${this.getTotal().toLocaleString("vi-VN")}đ`.padStart(48) + " │");
            console.log("└" + "─".repeat(50) + "┘");
        },

        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        clearCart() {
            items = [];
            activeDiscount = { type: "none", value: 0 };
        }
    };
}

const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();
cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());