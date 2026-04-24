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