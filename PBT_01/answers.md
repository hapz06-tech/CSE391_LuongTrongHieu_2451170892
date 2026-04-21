# PHIẾU TRẢ LỜI CÂU HỎI

## PHẦN A — KIỂM TRA ĐỌC HIỂU
### Câu A1 - HTTP & Browser
**Câu 1: các bước để truy cập vào trang `https://shopee.vn`**
1. Request xuất phát từ Laptop -> đi qua router Wifi nhà trọ
2. -> qua nhà mạng VNPT(Viettel, FPT,..) -> xuyên qua cáp quang
3. -> Đến data center của Shopee ở Singapore
4. -> Server nhận và xử lý request truy cập trang chủ
5. -> Respone chạy ngược lại: cáp quang -> VNPT -> Router -> Laptop
6. -> Trình duyệt nhận file HTML, CSS, JS -> render ra giao diện -> Nhìn thấy giao diện trên màn hình laptop.

**Nguồn tham khảo**: [tuan_1_html5/01_introduction_html_universe.md](https://github.com/ktzung/CCC_Frontend/blob/main/tuan_1_html5/01_introduction_html_universe.md)

**Câu 2**

Trong Devtools của chrome, tab **Network** cho thấy:
* Name
* Status
* Type
* Initiator
* Size
* Time

**Status code của request đầu tiên**
![Status code](screenshots/status.png)

**Tổng thời gian load trang**
![Thời gian load trang](screenshots/Runtime.png)

**Request trả về file CSS**
![Request file CSS](screenshots/RequestCSS.png)

### Câu A2 - Semantic HTML

#### 1. Tại sao trang web bị Google đánh giá SEO thấp?

Trang web mắc lỗi lạm dụng thẻ `<div>`. Thẻ `<div>` là thẻ trung tính, không mang ý nghĩa nội dung. Điều này khiến bộ máy tìm kiếm của Google không xác định được đâu là nội dung chính, đâu là thanh điều hướng, dẫn đến việc xếp hạng thấp.

#### 2. Danh sách 4 lỗi semantic và cách sửa:

| STT | Lỗi hiện tại | Cách sửa | Ý nghĩa|
|-----|--------------|----------|--------|
| 1   | `<div class="header">` | `<header>` | xác định phần đầu trang. |
| 2   | `<div class="menu">` | `<nav>` | Khu vực thanh điều hướng |
| 3   | `<div class="main">` | `<main>` | Nội dung chính của trang. |
| 4   | `<div class="title">` | `<h1>` | Tiêu đề chính của trang. |
| 5   | `<img src="iphone.jpg">` | Thêm thuộc tính `alt="..."` | Giúp google hiển thị nội dung ảnh khi ảnh không hiển thị được |

#### 3. Đoạn mã sửa lại:
``` html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>
<main><header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>
<main>
    <article class="product">
        <h1>iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>
        <figure>
            <img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro chính hãng">
        </figure>
    </article>
</main>
<footer>© 2026 ShopTLU</footer>
    <article class="product">
        <h1>iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>
        <figure>
            <img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro chính hãng">
        </figure>
    </article>
</main>
<footer>© 2026 ShopTLU</footer>
```

**Nguồn tham khảo**: [03_head_data_html.md](https://github.com/ktzung/CCC_Frontend/blob/main/tuan_1_html5/03_head_data_html.md), [04_visible_part_html.md](https://github.com/ktzung/CCC_Frontend/blob/main/tuan_1_html5/04_visible_part_html.md)
### Câu A3 — Block vs Inline

```
+-------------------------------------------------------+
| Hộp 1                                                                 | (Block chiếm hết 1 dòng)
+-------------------------------------------------------+
Text A Text B                                                        (Inline nằm cùng hàng)
+-------------------------------------------------------+
| Hộp 2                                                                | (Block chiếm hết 1 dòng)
+-------------------------------------------------------+
Text C Text D                                                       (Inline/Strong cùng hàng)
+-------------------------------------------------------+
| Hộp 3                                                                | (Block chiếm hết 1 dòng)
+-------------------------------------------------------+
```
* Thẻ Block (`<div>`): Luôn bắt đầu trên một dòng mới và kéo dài đến hết chiều rộng màn hình.
* Thẻ Inline (`<span>, <strong>`): Chỉ chiếm chiều rộng bằng chính nội dung của nó và không tạo dòng mới.
**Nguồn tham khảo**: [02_basic_structure_html.md](https://github.com/ktzung/CCC_Frontend/blob/main/tuan_1_html5/02_basic_structure_html.md)
### Câu A4 — Table
#### 1. Phân biệt các thẻ:
* `<thead>`: Nhóm các nội dung tiêu đề.
* `<tbody>`: Nhóm các nội dung dữ liệu chính của bảng.
* `<tfoot>`: Nhóm các nội dung tổng kết hoặc thông tin bổ sung.
#### Tại sao KHÔNG NÊN dùng table để tạo layout?
1. **Khả năng truy cập (Accessibility)**: Trình đọc màn hình sẽ đọc bảng theo hàng/cột, gây rối loạn cho người khiếm thị khi họ chỉ muốn đọc nội dung trang web.

2. **Hiệu suất (Performance)**: Trình duyệt phải tính toán toàn bộ kích thước bảng trước khi hiển thị, khiến trang tải chậm hơn.

3. **Không linh hoạt (Responsive)**: Bảng rất khó để co giãn hoặc chuyển đổi cấu trúc khi xem trên thiết bị di động (Mobile).

**Nguồn tham khảo**: [05_tables_hyperlinks.md](https://github.com/ktzung/CCC_Frontend/blob/main/tuan_1_html5/05_tables_hyperlinks.md)
## PHẦN B — THỰC HÀNH CODE
### Bài B1 — Trang Profile cá nhân (profile.html)
**File**: [profile.html](profile.html)
### Bài B2 — Trang Sản phẩm E-Commerce
**File**: [products.html](products.html)
### Bài B3 — Debug HTML
* Lỗi 1: Dòng 1: Thiếu html trong `<!DOCTYPE>` → Sửa thành `<!DOCTYPE html>`.
* Lỗi 2: Dòng 4: Thẻ `<title>` chưa đóng → Thêm `</title>`.
* Lỗi 3: Dòng 5: Thuộc tính charset viết sai chuẩn utf8 → Sửa thành UTF-8.
* Lỗi 4: Dòng 8: Thẻ đóng `<h1>` viết sai `<h1>` → Sửa thành `</h1>`.
* Lỗi 5: Dòng 12: Thẻ `<a>` đóng sai `<a>` → Sửa thành `</a>`.
* Lỗi 6: Dòng 19: Thẻ `<img>` thiếu thuộc tính alt.
* Lỗi 7: Dòng 21: Thẻ `<b>` đóng sau thẻ `<p>` (sai thứ tự nesting) → Đóng `</b>` trước.
* Lỗi 8: Dòng 40: Có 2 thẻ `<main>` → Đổi thẻ thứ 2 thành `<aside>` hoặc `<div>`.
* Lỗi 9: Dòng 26: Thẻ `<table>` thiếu cấu trúc `<thead>/<tbody>`.
* Lỗi 10: Dòng 42: Thẻ `<p>` trong footer chưa đóng → Thêm `</p>`.

**File**: [debug.html](debug.html)