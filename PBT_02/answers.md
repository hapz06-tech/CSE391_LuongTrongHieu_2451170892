---
## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 10 Input Types phổ biến trong HTML5 [1]
1. `type="text"`: Ô nhập văn bản thường. Tự động loại bỏ dấu xuống dòng. Dùng: Nhập họ tên khách hàng.
2. `type="email"`: Ô nhập văn bản. Tự động kiểm tra có ký tự `@` và domain hợp lệ. Dùng: Nhập email đăng ký.
3. `type="password"`: Ẩn ký tự dưới dạng dấu `*` hoặc `•`. Không tự validate nhưng bảo mật hiển thị. Dùng: Nhập mật khẩu.
4. `type="tel"`: Ô nhập văn bản, mở bàn phím số trên điện thoại. Không validate tự động định dạng. Dùng: Nhập số điện thoại giao hàng.
5. `type="number"`: Ô có nút tăng/giảm số. Ràng buộc nhập số, có thể giới hạn `min`, `max`, `step`. Dùng: Nhập số lượng sản phẩm.
6. `type="date"`: Hiển thị bộ chọn lịch (Date picker). Ép người dùng chọn ngày tháng hợp lệ. Dùng: Nhập ngày sinh.
7. `type="radio"`: Nút chọn hình tròn. Ràng buộc chỉ được chọn 1 trong 1 nhóm cùng `name`. Dùng: Chọn giới tính hoặc Phương thức thanh toán.
8. `type="checkbox"`: Nút chọn hình vuông. Cho phép chọn nhiều, có thể yêu cầu `required`. Dùng: Check "Đồng ý điều khoản".
9. `type="color"`: Hiển thị bảng chọn màu. Trả về mã màu HEX. Dùng: Chọn màu áo/sản phẩm muốn mua.
10. `type="file"`: Nút tải lên tập tin. Có thể giới hạn loại file bằng `accept`. Dùng: Tải lên ảnh đại diện.

### Câu A2 — Validation Attributes [2]
*   **Trường hợp 1** (`required` bị bỏ trống): Trình duyệt chặn submit, hiển thị popup "Vui lòng điền vào trường này".
*   **Trường hợp 2** (`type="email"` nhập sai format "abc"): Trình duyệt báo lỗi "Vui lòng bao gồm '@' trong địa chỉ email".
*   **Trường hợp 3** (`min="1" max="10` nhưng nhập 15): Trình duyệt báo lỗi giá trị phải nhỏ hơn hoặc bằng 10.
*   **Trường hợp 4** (`pattern="[0-9]{10}"` value là abc123): Trình duyệt báo lỗi định dạng không khớp với yêu cầu.
*   **Trường hợp 5** (`minlength="8"` giá trị chỉ có 3 ký tự): Trình duyệt báo văn bản ít nhất phải là 8 ký tự.

### Câu A3 — Accessibility [2]
1.  **Tại sao `<label for="email">` quan trọng:** Trình đọc màn hình (Screen reader) sẽ đọc to nội dung label khi người dùng focus vào ô input, giúp người khiếm thị biết họ cần nhập gì. Ngoài ra, click vào chữ cũng tự focus vào ô input.
2.  **Khi nào dùng `<fieldset>` + `<legend>`:** Dùng khi cần gom nhóm các trường thông tin có liên quan logic với nhau (Ví dụ: Gom Thành phố, Quận Huyện, Địa chỉ vào một thẻ `<fieldset>` và đặt `<legend>` là "Thông tin giao hàng").
3.  **Về `aria-label`:** Dùng khi trên màn hình thiết kế không có text nhãn (VD: ô tìm kiếm chỉ có icon kính lúp). KHÔNG nên dùng khi đã có `<label>` vì trình đọc màn hình sẽ đọc bị trùng lặp, gây nhiễu thông tin.

### Câu A4 — Media [3]
1.  **Thuộc tính `loading="lazy"`:** Báo trình duyệt khoan tải ảnh này nếu nó chưa hiển thị trên màn hình. **Cải thiện:** Tốc độ load trang ban đầu và tiết kiệm băng thông. **Không nên dùng:** Cho những ảnh ở đầu trang (above the fold) vì làm chậm hiển thị ảnh quan trọng.
2.  **Nhiều `<source>` trong `<video>`:** Để dự phòng, vì các trình duyệt hỗ trợ định dạng khác nhau (VD: Chrome hỗ trợ WebM, Safari cũ chỉ chuộng MP4). 3 format phổ biến: `mp4`, `webm`, `ogg`.
3.  **Thuộc tính `alt`:** Dùng làm văn bản thay thế khi ảnh lỗi và để Screen Reader đọc.
    *   iPhone 16: `alt="Điện thoại iPhone 16 Pro Max màu Titan tự nhiên"`
    *   Ảnh trang trí: `alt=""` (để rỗng để screen reader bỏ qua)
    *   Ảnh biểu đồ: `alt="Biểu đồ cột hiển thị doanh thu Quý 1 năm 2026 tăng 25% so với cùng kỳ"`

---

## PHẦN C — PHÂN TÍCH & SUY LUẬN
### Câu C1 — Debug Form
#### Danh sách 8 lỗi tìm thấy và phương án sửa đổi

*   **Lỗi 1: Dòng 2** — Input "Tên" không có `<label for="...">` và thiếu thuộc tính `name`, `id`, vi phạm tiêu chuẩn accessibility.
    *   **Sửa:** `<label for="fullname">Tên:</label> <input type="text" id="fullname" name="fullname" required>`

*   **Lỗi 2: Dòng 4** — Input "Email" sử dụng `placeholder` thay cho nhãn và thiếu thuộc tính `name`, `id`.
    *   **Sửa:** `<label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>`

*   **Lỗi 3: Dòng 6** — Input "Mật khẩu" thiếu nhãn định danh (`label`), `id` và thuộc tính `required`.
    *   **Sửa:** `<label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" required>`

*   **Lỗi 4: Dòng 7** — Input "Nhập lại mật khẩu" thiếu nhãn, `name`, `id` và không thể phân biệt với ô mật khẩu chính nếu không có định danh.
    *   **Sửa:** `<label for="re_password">Nhập lại mật khẩu:</label> <input type="password" id="re_password" name="re_password" required>`

*   **Lỗi 5: Dòng 9** — Input "Phone" sử dụng sai `type="text"`. Cần dùng `type="tel"` để hỗ trợ bàn phím số và thêm `pattern` để validate.
    *   **Sửa:** `<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10,11}" value="0901234567" required>`

*   **Lỗi 6: Dòng 11** — Thẻ `<select>` thiếu nhãn (`label`) và thuộc tính `name` để gửi dữ liệu về server.
    *   **Sửa:** `<label for="city">Thành phố:</label> <select id="city" name="city">...</select>`

*   **Lỗi 7: Dòng 12-13** — Các thẻ `<option>` thiếu thuộc tính `value`. Server sẽ không nhận được giá trị cụ thể khi người dùng chọn.
    *   **Sửa:** `<option value="hanoi">Hà Nội</option> <option value="hcm">TP.HCM</option>`

*   **Lỗi 8: Dòng 16-18** — Thẻ `<label>` chứa văn bản điều khoản nhưng thiếu thành phần `<input type="checkbox">` để người dùng thực hiện thao tác chọn.
    *   **Sửa:** `<label><input type="checkbox" name="terms" required> Tôi đồng ý điều khoản</label>`

---

### Câu C2 (10đ) — Thiết kế chiến lược Validation

#### 1. Viết pattern regex
*   **CMND/CCCD (Đúng 12 chữ số):** `^\d{12}$`
*   **Số tài khoản (10 - 15 chữ số):** `^\d{10,15}$`

---

#### 2. HTML5 Validation có đủ an toàn cho ứng dụng ngân hàng không?
**Trả lời:** **KHÔNG.**

**Giải thích:**
*   **Dễ bị vô hiệu hóa:** Người dùng có thể dùng Công cụ nhà phát triển (F12) để xóa các thuộc tính `required` hoặc `pattern` trực tiếp trên trình duyệt.
*   **Bypass qua công cụ bên ngoài:** Kẻ xấu có thể gửi request trực tiếp đến máy chủ thông qua các công cụ như Postman, cURL hoặc script tự động mà không cần thông qua giao diện web, khiến mọi ràng buộc trên HTML5 trở nên vô nghĩa.

---

#### 3. 3 loại validation HTML5 KHÔNG THỂ làm được (Phải dùng JavaScript)
1.  **Kiểm tra bất đồng bộ (Asynchronous Validation):** Kiểm tra xem email hoặc số tài khoản đã tồn tại trong cơ sở dữ liệu chưa (cần gọi API lên server).
2.  **So sánh giữa các trường (Cross-field Validation):** Kiểm tra xem ô "Nhập lại mã PIN" có khớp hoàn toàn với ô "Mã PIN" đã nhập trước đó hay không.
3.  **Logic điều kiện phức tạp:** Thay đổi quy tắc validation dựa trên lựa chọn khác (ví dụ: nếu chọn quốc tịch "Nước ngoài" thì yêu cầu định dạng ID khác so với "Việt Nam").

---

#### 4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend
1.  **Tấn công Tiêm nhiễm (Injection Attacks):** Nếu không kiểm tra ở Backend, kẻ tấn công có thể gửi các chuỗi mã độc (SQL Injection, XSS) để phá hoại cơ sở dữ liệu hoặc đánh cắp thông tin người dùng.
2.  **Vi phạm tính toàn vẹn dữ liệu:** Dữ liệu sai định dạng (ví dụ: số tiền âm, số tài khoản chứa chữ cái) sẽ lọt vào hệ thống, gây lỗi logic nghiêm trọng trong các giao dịch tài chính và đối soát.

---

#### 5. Mã nguồn HTML mẫu (Demo Form)
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Đăng ký Ngân hàng số</title>
    <style>
        .form-container { max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial, sans-serif; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        input:invalid { border-color: red; }
        button { width: 100%; padding: 10px; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; }
    </style>
</head>
<body>

<div class="form-container">
    <h2>Đăng ký Tài khoản</h2>
    <form id="bankForm">
        <!-- CMND/CCCD -->
        <div class="form-group">
            <label for="idCard">CMND/CCCD (12 số):</label>
            <input type="text" id="idCard" name="idCard" required pattern="^\d{12}$" title="Vui lòng nhập đúng 12 chữ số">
        </div>

        <!-- Số tài khoản -->
        <div class="form-group">
            <label for="accountNumber">Số tài khoản (10-15 số):</label>
            <input type="text" id="accountNumber" name="accountNumber" required pattern="^\d{10,15}$" title="Số tài khoản từ 10 đến 15 chữ số">
        </div>

        <!-- Email -->
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required placeholder="example@bank.com">
        </div>

        <!-- PIN -->
        <div class="form-group">
            <label for="pin">Mã PIN (6 số):</label>
            <input type="password" id="pin" name="pin" required pattern="^\d{6}$" maxlength="6" title="Mã PIN phải có đúng 6 chữ số">
        </div>

        <button type="submit">Đăng ký</button>
    </form>
</div>

</body>
</html>
```


