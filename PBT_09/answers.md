## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — DOM Tree & querySelector

**1. Sơ đồ cây DOM Tree:**
```text
└── html
    └── body
        └── div#app
            ├── header
            │   ├── h1
            │   └── nav
            │       ├── a.active
            │       ├── a
            │       └── a
            └── main
                ├── form#todoForm
                │   ├── input#todoInput
                │   └── button
                └── ul#todoList
                    ├── li.todo-item
                    └── li.todo-item.completed
```

**2. Khai báo quy chuẩn querySelector:**
* Chọn thẻ `<h1>`:
```javascript
const heading = document.querySelector("h1");
```
* Chọn input trong form:
```javascript
const todoInput = document.querySelector("#todoForm input");
```
* Chọn tất cả `.todo-item`:
```javascript
const todoItems = document.querySelectorAll(".todo-item");
```
* Chọn link đang active:
```javascript
const activeLink = document.querySelector("nav a.active");
```
* Chọn `<li>` đầu tiên trong `#todoList`:
```javascript
const firstTodo = document.querySelector("#todoList li:first-child");
```
* Chọn tất cả `<a>` bên trong `<nav>`:
```javascript
const navLinks = document.querySelectorAll("nav a");
```

---

### Câu A2 — innerHTML vs textContent

**1. Khác biệt cốt lõi:**
* `innerHTML`: Đọc hoặc ghi nội dung dưới dạng chuỗi chứa cả các thẻ cấu trúc HTML. Trình duyệt khi nhận chuỗi này sẽ phân tích cú pháp để dựng nên các DOM nodes.
* `textContent`: Chỉ đọc hoặc ghi chuỗi văn bản thuần túy. Mọi ký tự hay thẻ HTML được truyền vào đây sẽ bị mã hóa thành chuỗi văn bản an toàn chứ không được thực thi.

**2. Lỗ hổng bảo mật XSS (Cross-Site Scripting):**
`innerHTML` nguy hiểm nếu chèn trực tiếp chuỗi chưa qua kiểm duyệt do người dùng nhập vào. Kẻ tấn công có thể chèn mã độc (VD: `<img src=x onerror="alert('Hacked!')">`). Trình duyệt sẽ tự động phân tích và thực thi mã độc đó.

**Cách khắc phục an toàn:**
```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```

---

### Câu A3 — Event Bubbling

**1. Thứ tự console.log mặc định khi click vào button:**
```text
BUTTON
INNER
OUTER
```

**2. Thứ tự console.log khi bỏ comment `e.stopPropagation()`:**
```text
BUTTON
```
*Giải thích:* Phương thức `e.stopPropagation()` chặn đứng hành vi lan truyền nổi bọt của sự kiện lên các tầng phía trên, khiến sự kiện không kích hoạt các trình lắng nghe nằm trên các phần tử tổ tiên bao bọc nó.

## PHẦN C — DEBUG & PHÂN TÍCH

### Câu C1 — Debug DOM Code

**1. Danh sách các lỗi phát hiện và cách xử lý:**
* **Lỗi 1:** Dòng `.addEventListener("onclick", ...)` viết sai cú pháp. Sửa `"onclick"` thành `"click"`.
* **Lỗi 2:** Biểu thức `countDisplay = count;` ghi đè biến tham chiếu DOM. Sửa thành `countDisplay.innerHTML = count;`.
* **Lỗi 3:** Gán `historyList.innerHTML = null;` dễ gây lỗi hiển thị chữ "null". Sửa thành `historyList.innerHTML = "";`.
* **Lỗi 4:** Gọi `item.remove;` thiếu cặp ngoặc tròn. Sửa thành `item.remove();`.
* **Lỗi 5:** `localStorage.getItem("count")` trả về String. Cần ép kiểu về số bằng `Number()`.
* **Lỗi 6:** Nếu bộ nhớ rỗng, giá trị biến `count` có thể nhận `null` hoặc `NaN`. Cần gán mặc định dự phòng `|| 0`.
* **Lỗi 7:** Mã khôi phục từ `localStorage` thiếu bước gán lại sự kiện click xóa cho các thẻ `<li>` mới.

**2. Đoạn mã hoàn chỉnh sau khi sửa lỗi:**
```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.innerHTML = count;
    historyList.innerHTML = "";
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove();
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.innerHTML = count;
    historyList.innerHTML = localStorage.getItem("history") || "";
    
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.addEventListener("click", function() {
            deleteHistory(this);
        });
    });
});
```

---

### Câu C2 — Performance

**1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?**
* **Tiêu tốn bộ nhớ:** Gắn sự kiện cho 1000 phần tử sẽ khởi tạo 1000 vùng nhớ độc lập để xử lý hàm callback, gây lãng phí tài nguyên RAM.
* **Bất tiện khi cập nhật:** Khi thêm hoặc xóa phần tử động trên DOM, lập trình viên phải bind lại sự kiện thủ công cho từng node mới.

**Giải quyết bằng Event Delegation:**
Tận dụng cơ chế nổi bọt (Event Bubbling), chỉ gán duy nhất **1 sự kiện** lên phần tử cha chung bao bọc bên ngoài. Khi thẻ con được tương tác, sự kiện lan truyền lên cha. Tại hàm xử lý của cha, ta dùng `e.target` để kiểm tra và xử lý thẻ con tương ứng.

**2. Tái cấu trúc tối ưu bằng DocumentFragment:**
```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

**Tại sao DocumentFragment chạy nhanh hơn?**
Chèn trực tiếp vào DOM thật (`document.body.appendChild`) sẽ ép trình duyệt phải tính toán lại kích thước và vẽ lại giao diện toàn màn hình (quá trình Reflow/Repaint). Chạy vòng lặp 1000 lần sẽ gây ra 1000 chu kỳ Reflow liên tục làm nghẽn UI. `DocumentFragment` đóng vai trò là cây DOM ảo nằm ngầm trong RAM, chèn 1000 phần tử vào đây tiêu tốn 0 lần Reflow. Sau đó đẩy toàn bộ fragment này vào DOM thật sẽ chỉ tốn đúng 1 lần Reflow.

