## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Viewport & Mobile-First
**1. Thẻ `<meta viewport>` chuẩn:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
* **Giải thích:**
  * `width=device-width`: Đặt chiều rộng của trang web bằng với chiều rộng vật lý của màn hình thiết bị.
  * `initial-scale=1.0`: Đặt mức độ thu phóng ban đầu là 100% khi trang web được load lần đầu.

**2. Nếu thiếu thẻ này trên iPhone:** Trình duyệt Safari trên iPhone (và hầu hết trình duyệt mobile) sẽ giả định trang web được thiết kế cho Desktop (thường lấy chiều rộng mặc định khoảng 980px). Sau đó, nó sẽ tự động thu nhỏ (scale down) toàn bộ trang web để vừa với màn hình điện thoại, khiến chữ và các thành phần trở nên cực kỳ nhỏ và khó đọc, người dùng phải zoom bằng tay.

**3. Mobile-First vs Desktop-First:**
* **Khác biệt:**
  * **Mobile-First:** Viết CSS mặc định cho giao diện điện thoại (màn hình nhỏ nhất) trước. Sau đó dùng `@media (min-width: ...)` để điều chỉnh layout khi màn hình lớn hơn.
  * **Desktop-First:** Viết CSS mặc định cho giao diện máy tính (màn hình lớn nhất) trước. Sau đó dùng `@media (max-width: ...)` để thu nhỏ hoặc ẩn bớt phần tử khi màn hình nhỏ đi.
* **Ví dụ CSS Breakpoint 768px:**
  * *Mobile-First:*
    ```css
    .content { display: block; } /* Default: Mobile */
    @media (min-width: 768px) { .content { display: flex; } } /* Tablet & Desktop */
    ```
  * *Desktop-First:*
    ```css
    .content { display: flex; } /* Default: Desktop */
    @media (max-width: 767.98px) { .content { display: block; } } /* Mobile */
    ```
* **Tại sao Mobile-First được khuyên dùng?** Hiệu suất tốt hơn. Trình duyệt trên mobile (vốn có CPU/mạng yếu hơn) sẽ không phải tải và ghi đè những đoạn CSS phức tạp của Desktop. Code cũng gọn gàng, tư duy logic đi từ cơ bản (core content) rồi mới mở rộng (progressive enhancement).

### Câu A2 — Breakpoints
Dựa theo chuẩn Bootstrap 5:
* **< 576px (Mobile / iPhone):** Lưới sản phẩm thường hiển thị **1 cột**.
* **≥ 576px (Landscape Mobile / Tablet nhỏ):** Lưới sản phẩm thường hiển thị **2 cột**.
* **≥ 768px (Tablet / iPad):** Lưới sản phẩm hiển thị **2-3 cột**.
* **≥ 992px (Laptop / Desktop nhỏ):** Lưới sản phẩm hiển thị **3-4 cột**.
* **≥ 1200px (Desktop lớn):** Lưới sản phẩm hiển thị **4 cột trở lên**.

### Câu A3 — Media Queries
Bảng kích thước `width` của `.container`:

| Chiều rộng màn hình | `.container` width | Giải thích |
|---------------------|--------------------|------------|
| 375px (iPhone SE)   | **100%** | Không đạt `min-width: 576px`, dùng CSS gốc. |
| 600px               | **540px** | Đạt `min-width: 576px` nhưng chưa tới 768px. |
| 800px               | **720px** | Đạt `min-width: 768px` nhưng chưa tới 992px. |
| 1000px              | **960px** | Đạt `min-width: 992px` nhưng chưa tới 1200px. |
| 1400px              | **1140px** | Đạt `min-width: 1200px`. |

### Câu A4 — SCSS Basics
**1. Variables (Biến):** Lưu trữ các giá trị tái sử dụng như màu sắc, font chữ.
* *Ví dụ:* `$primary-color: #3498db; body { color: $primary-color; }`

**2. Nesting (Lồng ghép):** Viết các selector lồng vào nhau theo cấu trúc HTML, giúp code dễ đọc.
* *Ví dụ:* `.nav { ul { margin: 0; } li { list-style: none; } }`

**3. Mixins:** Đóng gói một nhóm thuộc tính CSS để dùng lại ở nhiều nơi, có thể nhận tham số truyền vào.
* *Ví dụ:* `@mixin flex-center { display: flex; justify-content: center; align-items: center; } .box { @include flex-center; }`

**4. @extend / Inheritance (Kế thừa):** Cho phép một class chia sẻ tập hợp các thuộc tính với một class khác để tránh lặp code.
* *Ví dụ:* `%message-shared { border: 1px solid #ccc; padding: 10px; } .success { @extend %message-shared; border-color: green; }`

**Trình duyệt KHÔNG đọc được file `.scss`** vì chúng chỉ hiểu CSS tiêu chuẩn. Cần phải có công cụ biên dịch (Compiler như Dart Sass) để dịch mã `SCSS` thành mã `CSS` trước khi nhúng vào website. Lệnh compile cơ bản: `sass style.scss style.css`.

## PHẦN C — PHÂN TÍCH

### Câu C1 — Phân tích trang web thực (Ví dụ: Shopee)

**1. Phân tích giao diện trên 3 kích thước màn hình:**

* **Navigation (Điều hướng):**
    * **Mobile (375px):** Thanh điều hướng chính được thu gọn tối đa, sử dụng thanh công cụ tìm kiếm kết hợp với giỏ hàng và icon chat. Menu danh mục thường dùng thanh cuộn ngang hoặc icon dưới đáy màn hình.
    * **Tablet (768px):** Giao diện tương tự mobile nhưng thanh tìm kiếm được kéo dài hơn, các icon có khoảng cách rộng rãi hơn.
    * **Desktop (1440px):** Header hiển thị đầy đủ bao gồm logo lớn, thanh tìm kiếm ở giữa, các liên kết phụ trợ (Tải ứng dụng, Kết nối, Thông báo, Hỗ trợ) và thanh menu phụ ngay dưới ô tìm kiếm.

* **Lưới content (Sản phẩm):**
    * **Mobile:** Lưới sản phẩm hiển thị **2 cột**.
    * **Tablet:** Lưới sản phẩm tăng lên **4 cột**.
    * **Desktop:** Lưới sản phẩm hiển thị **6 cột**.

* **Elements bị ẩn trên mobile:**
    * Banner quảng cáo cỡ lớn hai bên sườn trang.
    * Danh sách menu text ở footer (thu gọn thành dạng Dropdown/Accordion).
    * Các danh mục sản phẩm chi tiết ở dạng danh sách sổ xuống (mega menu).

* **Font size:**
    * Kích thước chữ trên mobile nhỏ hơn (12px - 14px). Trên Desktop, font size cho các tiêu đề và giá cả được phóng to hơn (14px - 16px+).

**2. Media Queries (Ví dụ từ DevTools):**

```css
@media (max-width: 768px) {
    .shopee-pc-header { display: none; }
}

@media (min-width: 1200px) {
    .container { width: 1200px; margin: 0 auto; }
}
```

---

### Câu C2 — Thiết kế Responsive Strategy (Trang Đặt bàn nhà hàng)

**1. Wireframe Strategy (Sơ đồ bố cục):**

* **Mobile (< 768px):**
    * **Header:** Logo bên trái, nút Hamburger (☰) bên phải.
    * **Hero Image:** Ảnh cắt theo tỉ lệ 4:3 hoặc vuông, text đè lên ảnh.
    * **Form đặt bàn:** Nằm dưới Hero Image, xếp **1 cột** dọc.
    * **Grid ảnh món ăn:** Xếp thành **1 cột**.
    * **Bản đồ:** Nằm dưới cùng, chiếm 100% chiều rộng.
    * **Footer:** Các thông tin xếp dọc **1 cột**.

* **Tablet (768px - 1023px):**
    * **Header:** Logo bên trái, menu chữ nằm ngang.
    * **Form đặt bàn:** Chia thành lưới **2 cột**.
    * **Grid ảnh món ăn:** Hiển thị **2 cột** hoặc **3 cột** lưới.
    * **Bản đồ:** Chiếm 100% chiều rộng nhưng chiều cao lớn hơn.

* **Desktop (≥ 1024px):**
    * **Header:** Menu ngang đầy đủ, nút "Đặt bàn" nổi bật bên phải.
    * **Layout chính:** Chia làm 2 cột chính. Cột trái (70%) chứa Grid ảnh món ăn (**3 cột**). Cột phải (30%) chứa Form đặt bàn và Bản đồ Google Maps thu nhỏ.

**2. CSS Skeleton (Mobile-First với CSS Grid):**

```css
.main-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.food-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
}

.reservation-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
}

@media (min-width: 768px) {
    .food-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .reservation-form {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .main-layout {
        grid-template-columns: 2fr 1fr; 
        gap: 30px;
    }

    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .reservation-form {
        grid-template-columns: 1fr;
    }
}
```
### Bài B3 — Lệnh biên dịch SCSS sang CSS

Để biên dịch SCSS thành CSS, sử dụng lệnh sau trong Terminal (đảm bảo đã cài đặt Dart Sass):

```bash
sass scss/style.scss style.css