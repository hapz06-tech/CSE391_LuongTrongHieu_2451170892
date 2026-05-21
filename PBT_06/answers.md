## PHẦN A — KIỂM TRA ĐỌC HIỂU (TRACK A: BOOTSTRAP 5)

### Câu A1 — Grid System

| Kích thước | < 768px (Mobile) | 768px - 991px (Tablet) | ≥ 992px (Desktop) |
|------------|------------------|------------------------|-------------------|
| **Số cột hiển thị** | 1 cột | 2 cột | 4 cột |
| **Box layout** | 4 box xếp chồng dọc (mỗi box chiếm 100% width) | 2 hàng, mỗi hàng chứa 2 box (mỗi box chiếm 50% width) | 1 hàng chứa cả 4 box nằm ngang (mỗi box chiếm 25% width) |

**Trả lời câu hỏi thêm:**
* **`col-md-6` nghĩa là gì?** Lớp này quy định phần tử sẽ chiếm 6/12 cột lưới (tương đương 50% chiều rộng của hàng cha) bắt đầu áp dụng từ breakpoint `md` trở lên (màn hình có độ rộng từ 768px trở lên).
* **Tại sao không cần viết `col-sm-12`?** Bootstrap áp dụng triết lý thiết kế Mobile-First. Lớp `col-12` đặt mặc định cho phần tử chiếm toàn bộ 12 cột (100% width) từ kích thước màn hình nhỏ nhất (0px trở lên). Thuộc tính này tự động kế thừa lên các kích thước lớn hơn như `sm` (576px) cho đến khi gặp một breakpoint lớn hơn ghi đè nó (như `col-md-6`). Do đó, ghi thêm `col-sm-12` là dư thừa.

---

### Câu A2 — Utilities & Components

**1. Giải thích class `d-none d-md-block`:**
* **Ẩn khi nào:** Phần tử bị ẩn hoàn toàn (`display: none`) trên các thiết bị màn hình nhỏ hơn 768px (mặc định từ 0px bởi lớp `d-none`).
* **Hiển thị khi nào:** Phần tử xuất hiện trở lại dưới dạng khối (`display: block`) khi màn hình đạt kích thước từ Tablet trở lên (bắt đầu từ điểm ngắt `md` ≥ 768px nhờ lớp `d-md-block`).

**2. Liệt kê 5 spacing utilities (margin/padding):**
* `mt-3`: Định nghĩa khoảng cách phía trên phần tử (Margin Top) theo tỷ lệ chuẩn số 3 (thường tương đương 1rem hoặc 16px).
* `px-4`: Định nghĩa khoảng cách đệm bên trong theo trục X (cả Trái và Phải) theo tỷ lệ số 4 (thường tương đương 1.5rem hoặc 24px).
* `mb-auto`: Đặt thuộc tính Margin Bottom thành `auto`, tự động đẩy các phần tử đồng cấp khác xuống dưới cùng khi nằm trong một khối Flexbox.
* `py-2`: Định nghĩa khoảng cách đệm bên trong theo trục Y (cả Trên và Dưới) theo tỷ lệ số 2 (thường tương đương 0.5rem hoặc 8px).
* `mx-auto`: Đặt Margin bên trái và bên phải thành `auto`, dùng để căn giữa một phần tử dạng khối (Block) theo chiều ngang.

**3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`:**
* **`.container`:** Cung cấp một vùng chứa có độ rộng giới hạn tối đa (`max-width`) thay đổi linh hoạt theo từng nấc điểm ngắt breakpoint (sm, md, lg, xl, xxl) và luôn tự động căn giữa trang.
* **`.container-fluid`:** Vùng chứa luôn giãn rộng hết mức, chiếm trọn 100% chiều rộng của màn hình ở mọi kích thước thiết bị.
* **`.container-md`:** Hoạt động giống như một fluid container (chiếm 100% width) trên các thiết bị di động nhỏ dưới mức `md` (< 768px). Khi màn hình lớn đạt từ 768px trở lên, nó bắt đầu thu gọn lại và có `max-width` cố định giống hệt lớp `.container`.

## PHẦN C — PHÂN TÍCH (TRACK A — BOOTSTRAP 5)

### Câu C1 — Tùy biến Bootstrap

**1. Quy trình đổi màu `$primary` mặc định sang `#E63946`:**
* **Công cụ cần thiết:** Trình quản lý gói phần mềm Node.js (để chạy `npm`), gói thư viện `bootstrap` tải về local, và bộ biên dịch Sass (như Dart Sass).
* **Quy trình thực hiện:**
  1. Khởi tạo dự án thông qua lệnh `npm init` và tiến hành cài đặt mã nguồn Bootstrap bằng lệnh: `npm install bootstrap`.
  2. Tạo một file làm việc trung tâm dạng Sass, ví dụ: `assets/scss/custom.scss`.
  3. Tiến hành cấu hình biến đổi giá trị màu sắc mới đè lên trước khi nạp lõi chính thức của thư viện:
     ```scss
     $primary: #E63946;
     @import "../node_modules/bootstrap/scss/bootstrap";
     ```
  4. Thực hiện chạy dòng lệnh trình biên dịch Sass để xuất bản cấu trúc này sang tệp CSS đích thông thường: `sass assets/scss/custom.scss dist/css/custom.css`.
  5. Nhúng tệp mã nguồn mở rộng vừa biên dịch thành công `custom.css` vào trong giao diện thẻ `<head>` của HTML.

**2. Tại sao KHÔNG nên ghi đè trực tiếp `.btn-primary { background: red; }`?**
* **Mất tính đồng bộ đồng nhất:** Bootstrap sử dụng hệ thống màu sắc liên kết chặt chẽ. Khi thay đổi trực tiếp bằng CSS thuần lớp `.btn-primary`, các biến thể đi kèm liên đới như trạng thái rê chuột (`:hover`), kích hoạt nút bấm (`:active`), viền bóng bao quanh (`:focus`), hay các thành phần màu nền bổ trợ liên quan không hề đổi theo, dẫn đến giao diện bị lỗi loang lổ cục bộ.
* **Tối ưu hóa dung lượng code:** Việc ghi đè thủ công sinh thêm mã CSS thừa làm phình kích thước tệp. Sử dụng biến số Sass giúp framework tái cấu trúc đồng đều dữ liệu màu sắc ngay từ khâu lõi đầu vào một cách tinh gọn nhất.

---

### Câu C2 — So sánh việc dùng CSS thuần và Bootstrap

**1. Khảo sát so sánh định lượng thành phần (Navbar + Card):**

* **Số dòng CSS cần viết:**
  * *CSS thuần:* Cần tối thiểu từ 60 đến 100 dòng CSS nhằm thiết lập Flexbox, căn vị trí Media Queries ẩn hiện nút bấm Hamburger, bo góc, tạo đổ bóng mịn và thiết lập chuyển động mượt mà cho thẻ Card.
  * *Bootstrap version:* Gần như là **0 dòng CSS tùy chỉnh** do tận dụng 100% hệ thống Utility Classes có sẵn.

* **Thời gian phát triển sản phẩm:**
  * *CSS thuần:* Tốn nhiều thời gian (khoảng 30 - 45 phút) để căn đo độ rộng điểm ngắt màn hình, căn chỉnh padding, lề sườn và test kiểm thử các thuộc tính hiển thị chéo trên nhiều trình duyệt khác nhau để tránh vỡ khung layout.
  * *Bootstrap version:* Diễn ra cực kỳ nhanh chóng (chưa đầy 5 - 10 phút) thông qua việc kết hợp ghép chuỗi tên class mẫu định sẵn.

* **Khả năng tùy biến giao diện linh hoạt:**
  * *CSS thuần:* Cao tối đa tuyệt đối. Người lập trình có quyền can thiệp chi tiết sâu vào từng thuộc tính pixel, góc đổ bóng đổ hay tạo đường lượn chuyển động đặc thù riêng biệt mà không gặp bất kỳ rào cản bó buộc nào.
  * *Bootstrap version:* Bị giới hạn ở mức độ trung bình khá. Giao diện trông sẽ có xu hướng rập khuôn đại trà nếu người phát triển chỉ dùng các lớp cơ bản và không can thiệp sâu hệ thống biến Sass cốt lõi của thư viện.

**2. Đánh giá chiến lược áp dụng Framework:**

* **Khi nào NÊN dùng Bootstrap:**
  * Cần xây dựng nhanh các trang quản trị hệ thống nội bộ (Dashboard Admin), các bản làm thử nghiệm tính năng nhanh (MVP / Prototype) cần hoàn thiện gấp để trình diễn.
  * Đội ngũ tham gia dự án ở mức độ vừa nhỏ, thiếu nhân sự Frontend chuyên sâu xử lý Responsive đa nền tảng hoặc dự án cần quy chuẩn giao diện đồng nhất nhất quán giữa các lập trình viên.

* **Khi nào KHÔNG NÊN dùng Bootstrap:**
  * Những dự án thiết kế hạ tầng Website có tính chất sáng tạo nghệ thuật cao, Agency đồ họa đòi hỏi độ chi tiết Layout độc lạ phức tạp và mang bản sắc nhận diện thương hiệu riêng biệt tuyệt đối.
  * Sản phẩm ứng dụng Web chú trọng tối ưu hóa hiệu năng tải trang ở mức cực đoan (Cần loại bỏ mọi dòng code dư thừa giúp băng thông nhẹ nhất có thể).