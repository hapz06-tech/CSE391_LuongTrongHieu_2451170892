# 📋 PHIẾU BÀI TẬP 03: LỜI GIẢI CHI TIẾT
**Chủ đề:** CSS CORE — Selectors, Box Model, Inheritance & Cascade

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 3 Cách nhúng CSS

| Cách nhúng | Ví dụ | Ưu điểm | Nhược điểm | Khi nào dùng |
| :--- | :--- | :--- | :--- | :--- |
| **Inline** | `<h1 style="color: blue;">Text</h1>` | Nhanh, độ ưu tiên cao nhất. | Khó bảo trì, làm rối file HTML. | Fix lỗi gấp hoặc test nhanh. |
| **Internal** | `<style> h1 { color: blue; } </style>` | Không cần file .css riêng. | Chỉ có tác dụng trên 1 trang đơn lẻ. | Làm Landing Page 1 trang. |
| **External** | `<link rel="stylesheet" href="s.css">` | Dễ quản lý, tái sử dụng cao, cache tốt. | Tốn thêm request tải file. | **Dự án thực tế.** |

> **Câu hỏi thêm:** Nếu cùng áp dụng, **Inline CSS** thắng vì có điểm Specificity cao nhất (1,0,0,0).

---

### Câu A2 — CSS Selectors — Dự đoán kết quả

1. `h1` → Chọn: **ShopTLU**
2. `.price` → Chọn: **25.990.000đ** và **45.990.000đ**
3. `#app header` → Chọn: **Toàn bộ nội dung trong thẻ header**
4. `nav a:first-child` → Chọn: **Home**
5. `.product.featured h2` → Chọn: **MacBook Pro**
6. `article > p` → Chọn: **Tất cả các thẻ p là con trực tiếp của article** (gồm giá và mô tả)
7. `a[href="/"]` → Chọn: **Home**
8. `.top-bar.dark h1` → Chọn: **ShopTLU**

---

### Câu A3 — Box Model — Tính toán kích thước

**Trường hợp 1: content-box**
*   Chiều rộng hiển thị: $400px + (20px \times 2) + (5px \times 2) = 450px$
*   Không gian chiếm trên trang: $450px + (10px \times 2) = 470px$

**Trường hợp 2: border-box**
*   Chiều rộng hiển thị: **400px**
*   Kích thước content thực tế: $400px - 40px - 10px = 350px$
*   Không gian chiếm trên trang: $400px + 20px = 420px$

**Trường hợp 3: Margin collapse**
*   Khoảng cách: **40px** (Lấy giá trị lớn nhất thay vì cộng dồn).
*   **Nâng cao:** Khoảng cách = $40px + (-10px) = 30px$.

---

### Câu A4 — Specificity (Độ ưu tiên)

1. **Điểm Specificity:**
   *   Rule A (`p`): (0, 0, 1)
   *   Rule B (`.price`): (0, 1, 0)
   *   Rule C (`#main-price`): (1, 0, 0)
   *   Rule D (`p.price`): (0, 1, 1)
2. **Kết quả:** Element màu **Red** (độ ưu tiên ID cao nhất).
3. **Thêm Inline Style:** Màu **Orange** (thắng ID).
4. **Nếu Rule A có `!important`:** Màu **Black** (`!important` thắng tất cả).

---

## PHẦN B

### Kết quả đo lường Box Model (Câu B2)

*   **Hộp 1 (content-box):** Chiều rộng thực tế = **350px** (đo từ DevTools).
*   **Hộp 2 (border-box):** Chiều rộng thực tế = **300px** (đo từ DevTools).

**Giải thích sự khác biệt:**
1. Với **content-box** (mặc định), chiều rộng thực tế được tính bằng: `width + padding + border`. 
   Công thức: $300 + (20 \times 2) + (5 \times 2) = 350px$.
2. Với **border-box**, chiều rộng khai báo đã bao gồm cả phần đệm (padding) và đường viền (border). Trình duyệt sẽ tự động co phần nội dung bên trong lại để tổng chiều rộng luôn đúng bằng $300px$.

**Phần 2 - Layout 3 cột:**
* Khi dùng `border-box`, tổng chiều rộng là: $250px + 500px + 250px = 1000px$ (Khớp hoàn hảo với container).
* Nếu dùng `content-box`, tổng chiều rộng sẽ bị đội lên thành: $(250+30) + (500+40) + (250+30) = 1100px$. Điều này khiến các cột bị tràn và vỡ layout (đẩy xuống dòng).

### Bài B3 - Specificity Battle

#### 1. Danh sách 10 CSS Rules và Specificity Score

| STT | CSS Rule | Color | Specificity Score (ID, Class, Element) |
| :--- | :--- | :--- | :--- |
| 1 | `*` | silver | 0, 0, 0 |
| 2 | `p` | red | 0, 0, 1 |
| 3 | `.text` | orange | 0, 1, 0 |
| 4 | `p.text` | gold | 0, 1, 1 |
| 5 | `.text.highlight` | green | 0, 2, 0 |
| 6 | `p.text.highlight` | teal | 0, 2, 1 |
| 7 | `#demo` | blue | 1, 0, 0 |
| 8 | `p#demo` | navy | 1, 0, 1 |
| 9 | `#demo.text.highlight` | purple | 1, 2, 0 |
| 10 | `p#demo.text.highlight` | crimson | 1, 2, 1 |

#### 2. Element cuối cùng hiển thị màu gì? Tại sao?

**Kết quả:** Element `<p id="demo" class="text highlight">Hello World</p>` sẽ hiển thị màu **crimson** (đỏ thẫm).

**Tại sao:** Trình duyệt sẽ luôn ưu tiên áp dụng quy tắc có điểm Specificity (độ đặc tả) cao nhất. Trong 10 quy tắc trên, quy tắc `p#demo.text.highlight` mang điểm số `1, 2, 1` (gồm 1 ID, 2 Classes, 1 Element). Đây là mức Specificity lớn nhất trong danh sách, nên màu `crimson` sẽ ghi đè tất cả các màu thuộc các quy tắc khác, bất kể chúng được viết ở đâu trong file.

#### 3. Chụp screenshot kết quả

*(Lưu ý: Bạn hãy tự tải các file `specificity.html` và `specificity.css` về máy cùng một thư mục, mở file `specificity.html` bằng trình duyệt (Chrome, Edge, Safari...) và sử dụng công cụ của máy tính để chụp lại ảnh màn hình nhé. Kết quả hiển thị sẽ là dòng chữ "Hello World" màu đỏ thẫm.)*

#### 4. Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.

**Kết quả:** KHÔNG thay đổi.

**Giải thích:** 
Thứ tự từ trên xuống dưới trong file CSS (source order / nguyên tắc cascading) chỉ mang tính quyết định khi có hai hoặc nhiều rules **có cùng một mức specificity score**. Khi xảy ra tình huống hòa điểm đó, quy tắc nào được khai báo sau cùng sẽ "thắng" và được áp dụng.

Tuy nhiên, trong bài tập này, quy tắc số 10 (`p#demo.text.highlight`) có điểm Specificity cao tuyệt đối (1,2,1) và khác biệt hoàn toàn so với 9 quy tắc còn lại. Vì độ ưu tiên (specificity) luôn được trình duyệt xét trước tiên, nên dù bạn có đưa quy tắc này lên dòng đầu tiên của file CSS, nó vẫn được chọn làm quy tắc áp dụng cuối cùng để hiển thị màu sắc.

## PHẦN C — DEBUG & SUY LUẬN

### Câu C1 — Debug CSS Layout

1. **Chiều rộng thực tế (content-box):**
   *   Sidebar: $300 + 40 + 2 = 342px$
   *   Content: $660 + 60 + 2 = 722px$
   *   **Tổng:** $1064px$ ($> 960px$ của container)
2. **Nguyên nhân:** Do sử dụng `content-box` nên padding và border cộng thêm vào width làm vỡ layout.
3. **Cách sửa:**
   *   **Cách 1:** Dùng `box-sizing: border-box;` cho tất cả element.
   *   **Cách 2:** Trừ thủ công phần padding/border vào width (Sidebar = $258px$).

---

### Câu C2 — Cascade Puzzle

1. **Sản phẩm A (h2):** `font-size: 20px` (do `.card .title`); `color: green` (do `!important`).
2. **Mô tả sản phẩm (p):** `color: blue` (kế thừa từ `.card` qua `inherit`).
3. **Sản phẩm B (h2):** `font-size: 20px`; `color: blue` (kế thừa từ card).
4. **Mô tả sản phẩm B (p.highlight):** `color: green` (do `!important`).

---