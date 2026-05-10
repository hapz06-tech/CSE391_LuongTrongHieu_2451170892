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