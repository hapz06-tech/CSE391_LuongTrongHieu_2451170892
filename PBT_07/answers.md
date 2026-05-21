# LỜI GIẢI PHIẾU BÀI TẬP 07: JAVASCRIPT BASICS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — var / let / const

**1. Dự đoán Output:**
* **Đoạn 1:** `undefined`
* **Đoạn 2:** `ReferenceError: Cannot access 'y' before initialization`
* **Đoạn 3:** `TypeError: Assignment to constant variable.`
* **Đoạn 4:** `[1, 2, 3, 4]`
* **Đoạn 5:** * Trong block: `2`
  * Ngoài block: `1`

**2. Giải thích kết quả:**
* **Đoạn 1:** Do cơ chế **Hoisting**, khai báo `var x` được đẩy lên đầu phạm vi nhưng chưa được gán giá trị, vì vậy `console.log(x)` trả về `undefined`.
* **Đoạn 2:** Biến `let` cũng được hoist nhưng nằm trong vùng **Temporal Dead Zone (TDZ)** cho đến khi dòng khai báo được chạy qua. Truy cập trước khi gán sẽ kích hoạt lỗi tham chiếu.
* **Đoạn 3:** Biến `const` khai báo một hằng số có tham chiếu cố định. Việc cố tình gán lại giá trị mới bằng toán tử `=` sẽ sinh ra lỗi kiểu dữ liệu.
* **Đoạn 4:** `const` bảo vệ tham chiếu của biến chứa mảng `arr` chứ không đóng băng các phần tử bên trong mảng đó. Hành động `push(4)` làm thay đổi nội dung mảng nhưng giữ nguyên tham chiếu gốc nên hợp lệ.
* **Đoạn 5:** `let` có **Block scope**. Biến `a` nằm trong cặp dấu ngoặc nhọn `{}` hoàn toàn độc lập với biến `a` ở bên ngoài toàn cục.

---

### Câu A2 — Data Types & Coercion

**1. Dự đoán kết quả:**
```javascript
console.log(typeof null);              // "object"
console.log(typeof undefined);         // "undefined"
console.log(typeof NaN);              // "number"
console.log("5" + 3);                 // "53"
console.log("5" - 3);                 // 2
console.log("5" * "3");              // 15
console.log(true + true);            // 2
console.log([] + []);                // "" (chuỗi rỗng)
console.log([] + {});                // "[object Object]"
console.log({} + []);                // "[object Object]" (Hoặc 0 tùy thuộc vào trình duyệt nếu coi {} là block)
```

**2. Giải thích sự khác biệt giữa `"5" + 3` và `"5" - 3`:**
* Toán tử cộng (`+`) bị quá tải (overloaded) trong JavaScript: nếu một trong hai toán hạng là chuỗi kí tự, hệ thống sẽ ưu tiên ép kiểu toán hạng còn lại sang chuỗi rồi thực hiện **nối chuỗi**. Do đó `"5" + 3` biến thành `"5" + "3"` bằng `"53"`.
* Toán tử trừ (`-`) không áp dụng cho chuỗi văn bản. Hệ thống buộc phải kích hoạt cơ chế toán học, tự động chuyển đổi chuỗi `"5"` sang số `5` trước khi thực hiện phép tính, dẫn đến $5 - 3 = 2$.

---

### Câu A3 — So sánh == vs ===

**1. Dự đoán kết quả (true/false):**
```javascript
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
console.log(NaN == NaN);             // false
console.log(0 == false);             // true
console.log(0 === false);            // false
console.log("" == false);            // true
```

**2. Quy tắc áp dụng:**
Từ bây giờ trở đi, bạn **luôn luôn nên ưu tiên dùng toán tử `===` (Strict Equality)**. 
* **Tại sao:** Toán tử `===` so sánh cả giá trị lẫn kiểu dữ liệu mà không tự ý ép kiểu ngầm định như `==`. Sử dụng `===` giúp mã nguồn tường minh, tránh các lỗi logic tiềm ẩn, khó lường do cơ chế chuyển đổi dữ liệu tự động của JavaScript gây ra.

---

### Câu A4 — Truthy & Falsy

**1. Danh sách TẤT CẢ các giá trị Falsy trong JavaScript:**
Gồm 8 giá trị: `false`, `0`, `-0`, `0n` (BigInt), `""` (chuỗi rỗng), `null`, `undefined`, và `NaN`.

**2. Dự đoán kết quả in ấn văn bản:**
* `if ("0")` -> **In chữ A** (Chuỗi không rỗng là Truthy)
* `if ("")` -> Không in (Chuỗi rỗng là Falsy)
* `if ([])` -> **In chữ C** (Mảng, dù rỗng, vẫn là một đối tượng -> Truthy)
* `if ({})` -> **In chữ D** (Object rỗng là Truthy)
* `if (null)` -> Không in (Falsy)
* `if (0)` -> Không in (Falsy)
* `if (-1)` -> **In chữ G** (Bất kỳ số nào khác 0 đều là Truthy)
* `if (" ")` -> **In chữ H** (Chuỗi chứa khoảng trắng không phải chuỗi rỗng -> Truthy)

---

### Câu A5 — Template Literals

```javascript
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

---

## PHẦN C — SUY LUẬN

### Câu C1 — Debug JavaScript

**1. Danh sách các lỗi phát hiện và cách xử lý:**

* **Lỗi 1 (Lỗi logic nghiêm trọng):** Dòng `if (giaSauGiam = 0)` đang dùng toán tử gán (`=`) thay vì toán tử so sánh (`===`). Điều này làm biến `giaSauGiam` bị đổi thành giá trị số `0` (là Falsy), khiến khối mã kiểm tra bên trong không bao giờ chạy và kết quả trả về hàm luôn sai.
  * *Cách sửa:* Thay đổi thành `if (giaSauGiam === 0)`.
* **Lỗi 2 (Thiếu dấu chấm phẩy kết thúc biểu thức logic):** Dòng `return "Phần trăm giảm không hợp lệ"` thiếu dấu `;`. JavaScript có cơ chế tự động chèn dấu nhưng viết tường minh sẽ giúp code an toàn hơn.
  * *Cách sửa:* Thêm `;` cuối dòng.
* **Lỗi 3 (Ép kiểu tham số đầu vào):** Hàm gọi tính toán bằng chuỗi kí tự `tinhGiaGiamGia("100000", 20)`. Phép toán trừ vẫn chạy được do cơ chế ép kiểu tự động, nhưng để chuẩn kỹ thuật cần kiểm soát dữ liệu nghiêm ngặt.
  * *Cách sửa:* Truyền giá trị dạng số `100000` hoặc dùng `Number()` để chuyển đổi bên trong hàm.
* **Lỗi 4 (Lỗi ẩn Closure với biến `var` trong vòng lặp):** Khai báo `for (var i = 0; i < 5; i++)` kết hợp hàm bất đồng bộ `setTimeout`. Vì biến `var` có phạm vi function/global scope chứ không có block scope, khi hàm `setTimeout` thực thi sau 1000ms, vòng lặp đã chạy xong và biến `i` toàn cục lúc này đã bằng `5`. Kết quả màn hình sẽ in ra 5 dòng chữ `Item 5` thay vì chạy từ 0 đến 4.
  * *Cách sửa:* Đổi khai báo `var i` thành `let i`. `let` tạo ra một phạm vi block độc lập cho biến `i` ở mỗi lượt lặp.

**2. Mã nguồn hoàn chỉnh sau khi sửa lỗi:**

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    const gia = Number(giaBan);
    const phanTram = Number(phanTramGiam);

    if (isNaN(gia) || isNaN(phanTram)) {
        return "Lỗi: Input không phải số";
    }

    if (phanTram < 0 || phanTram > 100) {
        return "Phần trăm giảm không hợp lệ";
    }
    
    const giamGia = (gia * phanTram) / 100;
    const giaSauGiam = gia - giamGia;
    
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

const gia = tinhGiaGiamGia(100000, 20);
console.log(`Giá sau giảm: ${gia}đ`);

const gia2 = tinhGiaGiamGia(50000, 110);
console.log(`Giá: ${gia2}`);

for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(`Item ${i}`);
    }, 1000);
}
```

---
