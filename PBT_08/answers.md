# LỜI GIẢI PHIẾU BÀI TẬP 08: JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Function Declaration vs Expression vs Arrow

**1. Viết cùng 1 hàm theo 3 cách:**

* **Cách 1: Function Declaration**
```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: 0,
        thuc_nhan: luong - thue
    };
}
```

* **Cách 2: Function Expression**
```javascript
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: 0,
        thuc_nhan: luong - thue
    };
};
```

* **Cách 3: Arrow Function**
```javascript
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thuong: 0,
        thuc_nhan: luong - thue
    };
};
```

**2. Khác biệt về Hoisting:**
Có sự khác biệt lớn về cơ chế Hoisting giữa Function Declaration và hai cách còn lại.

* **Function Declaration:** Được ép toàn bộ cấu trúc lên đầu phạm vi (hoisted hoàn toàn). Bạn có thể gọi hàm trước khi viết dòng định nghĩa nó.
```javascript
console.log(tinhThueBaoHiem(15000000));

function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
}
```

* **Function Expression và Arrow Function:** Khi khai báo với `const` hoặc `let`, các biến chứa hàm chỉ được hoist phần tên nhưng nằm trong vùng chết tạm thời (Temporal Dead Zone). Gọi hàm trước khi gán sẽ lập tức sinh lỗi.
```javascript
console.log(tinhThueBaoHiem(15000000));

const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: 0, thuc_nhan: luong - thue };
};
```

---

### Câu A2 — Scope & Closure

**1. Dự đoán output:**
* **Đoạn 1:**
  * `1`
  * `2`
  * `3`
  * `2`
  * `2`
* **Đoạn 2 (Sau 200ms):**
  * `var: 3`
  * `var: 3`
  * `var: 3`
  * `let: 0`
  * `let: 1`
  * `let: 2`

**2. Giải thích chi tiết:**
* **Với vòng lặp `var`:** Từ khóa `var` không có đặc tính block scope mà sở hữu function/global scope. Cả 3 hàm callback bất đồng bộ của `setTimeout` khi được gọi ra thực thi thì vòng lặp đếm đã kết thúc từ trước đó, biến `i` dùng chung cho toàn cục lúc này đã mang giá trị bằng `3`. Do đó, cả 3 lần in ra đều nhận giá trị `3`.
* **Với vòng lặp `let`:** Từ khóa `let` hỗ trợ block scope. Tại mỗi lượt lặp, JavaScript khởi tạo một phạm vi biến đóng hoàn toàn mới cho `j`. Mỗi hàm callback trong `setTimeout` tạo thành một closure lưu giữ riêng bản sao giá trị `j` của lượt chạy đó, giúp kết quả in ra chính xác theo trình tự `0, 1, 2`.

---

### Câu A3 — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const res1 = nums.filter(x => x % 2 === 0);
const res2 = nums.map(x => x * 3);
const res3 = nums.reduce((sum, x) => sum + x, 0);
const res4 = nums.find(x => x > 7);
const res5 = nums.some(x => x > 10);
const res6 = nums.every(x => x > 0);
const res7 = nums.map(x => `Số ${x} là ${x % 2 === 0 ? "chẵn" : "lẻ"}`);
const res8 = [...nums].reverse();
```

---

### Câu A4 — Object Destructuring & Spread

**1. Dự đoán output:**
```javascript
// Destructuring
console.log(name, price, ram, color);  // "iPhone 16" 25990000 8 "Titan"
console.log(specs);                     // ReferenceError: specs is not defined

// Spread
console.log(updated.price);            // 23990000
console.log(updated.sale);             // true
console.log(product.price);            // 25990000

// Spread gotcha
console.log(product.specs.ram);        // 16
```

**2. Giải thích lý do kết quả Gotcha:**
Cú pháp Spread (`...`) thực hiện cơ chế sao chép nông (**Shallow Copy**). Nó tạo ra một đối tượng mới và sao chép các thuộc tính tầng ngoài cùng, nhưng đối với các đối tượng lồng sâu bên trong (như object con `specs`), nó chỉ sao chép lại địa chỉ vùng nhớ (tham chiếu). Vì vậy, `copy.specs` và `product.specs` vẫn đang trỏ chung vào một vùng dữ liệu duy nhất trên bộ nhớ. Thay đổi `copy.specs.ram` sẽ trực tiếp làm thay đổi giá trị thuộc vật thể gốc `product.specs.ram`.
```
## PHẦN C — SUY LUẬN

### Câu C1 — Refactor Code

Mã nguồn hàm `processOrders` sau khi được tái cấu trúc tối ưu gọn gàng:

```javascript
const processOrders = (orders) => 
    orders
        .filter(order => order.status === "completed" && order.total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total - total * 0.1
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

---

### Câu C2 — Thiết kế API (`miniArray`)

```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue !== undefined ? initialValue : arr[0];
        let startIndex = initialValue !== undefined ? 0 : 1;

        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

console.log(miniArray.map([1, 2, 3], x => x * 2));        
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); 
```