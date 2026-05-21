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

## PHẦN A — KIỂM TRA ĐỌC HIỂU (TRACK B: TAILWINDCSS)

### Câu A1 — Utility Classes

- `flex` → display: flex
- `items-center` → align-items: center
- `justify-between` → justify-content: space-between
- `p-4` → padding: 1rem (16px)
- `bg-white` → background-color: #ffffff
- `shadow-md` → box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
- `rounded-lg` → border-radius: 0.5rem (8px)
- `hover:shadow-xl` → box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) (khi di chuột)
- `transition-shadow` → transition-property: box-shadow
- `duration-300` → transition-duration: 300ms
- `w-16` → width: 4rem (64px)
- `h-16` → height: 4rem (64px)
- `rounded-full` → border-radius: 9999px
- `object-cover` → object-fit: cover
- `ml-4` → margin-left: 1rem (16px)
- `flex-1` → flex: 1 1 0%
- `text-lg` → font-size: 1.125rem (18px), line-height: 1.75rem
- `font-semibold` → font-weight: 600
- `text-gray-800` → color: #1f2937
- `truncate` → overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
- `text-sm` → font-size: 0.875rem (14px), line-height: 1.25rem
- `text-gray-500` → color: #6b7280
- `px-4` → padding-left: 1rem; padding-right: 1rem;
- `py-2` → padding-top: 0.5rem; padding-bottom: 0.5rem;
- `bg-blue-500` → background-color: #3b82f6
- `text-white` → color: #ffffff
- `rounded-md` → border-radius: 0.375rem (6px)
- `hover:bg-blue-600` → background-color: #2563eb (khi di chuột)
- `focus:ring-2` → box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color) (khi focus)
- `focus:ring-blue-300` → --tw-ring-color: #93c5fd (khi focus)

### Câu A2 — Responsive & States

**1. Giải thích prefix responsive (`md:`, `lg:`, `xl:`):**
TailwindCSS sử dụng cơ chế Mobile-First. Các tiền tố này đại diện cho các điểm ngắt (breakpoints) min-width. Khi một class có tiền tố này, nó sẽ chỉ có hiệu lực từ kích thước màn hình đó trở lên.
- `md:` áp dụng khi màn hình đạt độ rộng từ 768px trở lên.
- `lg:` áp dụng khi màn hình đạt độ rộng từ 1024px trở lên.
- `xl:` áp dụng khi màn hình đạt độ rộng từ 1280px trở lên.
*Ví dụ `md:grid-cols-2 lg:grid-cols-4`:* Mặc định ở màn hình nhỏ (mobile) lưới sẽ có 1 cột. Khi màn hình từ 768px trở lên (tablet), lưới chuyển sang 2 cột. Khi màn hình từ 1024px trở lên (desktop), lưới chuyển sang 4 cột.

**2. Giải thích state modifiers:**
- `hover:`: Kích hoạt thuộc tính CSS khi người dùng di chuột vào phần tử.
- `focus:`: Kích hoạt thuộc tính CSS khi phần tử được nhấp chuột chọn hoặc di chuyển tới bằng phím Tab (ví dụ: ô input đang nhập liệu).
- `active:`: Kích hoạt thuộc tính CSS tại thời điểm chính xác khi người dùng đang bấm giữ chuột trên phần tử.
- `group-hover:`: Khi người dùng hover vào phần tử cha (được khai báo class `group`), phần tử con có class `group-hover:` sẽ tự động kích hoạt hiệu ứng.

**3. Class Tailwind tương đương với `d-none d-md-flex`:**
```html
class="hidden md:flex"
```
## PHẦN C — PHÂN TÍCH (TRACK B — TAILWINDCSS)

### Câu C1 — Tailwind vs CSS thuần

**- HTML file size:** Tệp HTML sử dụng TailwindCSS có dung lượng lớn hơn hẳn so với HTML của phiên bản CSS thuần. Nguyên do là tất cả thuộc tính định dạng (styling) đều phải viết tường minh thông qua chuỗi class dài ngay bên trong các thẻ cấu trúc.

**- Maintainability (Khả năng bảo trì):**
Ban đầu, HTML của Tailwind nhìn khá rối mắt và khó đọc do lượng class lớn. Tuy nhiên, nó lại cực kỳ dễ sửa đổi và bảo trì về lâu dài. Khi cần đổi giao diện của một element, ta chỉ cần sửa trực tiếp class trên thẻ đó mà không sợ làm ảnh hưởng đến các thành phần khác trên trang, loại bỏ hoàn toàn nỗi sợ "side-effects" (sửa chỗ này vỡ chỗ kia) của CSS truyền thống.

**- Reusability (Khả năng tái sử dụng):**
Với Tailwind, việc tái sử dụng tốt nhất là thông qua các component của các framework JS (React, NextJS, Vue). Trong trường hợp viết HTML tĩnh, ta có thể tạo ra các class gom cụm bằng cách dùng tính năng `@apply` trong file CSS gốc:
```css
.btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600;
}
```

### Câu C2 — Performance

**1. Tại sao file CSS cuối cùng của Tailwind lại NHỎ HƠN Bootstrap CSS?**
Bootstrap chứa tất cả mã CSS được tạo sẵn cho mọi component và utility của họ, dung lượng tệp này cố định và khá lớn (khoảng vài trăm KB). Ngược lại, TailwindCSS chạy một công cụ quét thời gian thực. Tệp CSS cuối cùng chỉ chứa đúng những class thực sự xuất hiện trong mã nguồn HTML của bạn. Nếu bạn không dùng đến class đó, nó sẽ không tồn tại trong file CSS đầu ra. Do đó, file CSS của dự án Tailwind lớn thường chỉ nặng loanh quanh 10 - 50KB.

**2. Giải thích Tailwind PurgeCSS (Tailwind JIT):**
Cơ chế Just-In-Time (JIT) của Tailwind hoạt động bằng cách quét toàn bộ các file dự án (HTML, JS, v.v.) để tìm kiếm các chuỗi văn bản trùng với tên class của Tailwind. Nó sẽ loại bỏ hoàn toàn toàn bộ những class CSS dư thừa không được sử dụng và chỉ biên dịch ra file CSS những gì đang được dùng thực tế.

**3. Khi nào KHÔNG nên dùng TailwindCSS?**
- **Tình huống 1:** Xây dựng các trang web đơn giản, sử dụng HTML thuần túy không qua các framework component (như React/NextJS) và không có công cụ đóng gói build-tool. Việc quản lý các chuỗi class lặp đi lặp lại trên hàng chục file HTML tĩnh sẽ trở thành một thảm họa về copy-paste.
- **Tình huống 2:** Khi đội ngũ phát triển chưa có kiến thức nền tảng vững chắc về CSS thuần (phải hiểu rõ bản chất hệ thống CSS Grid, Flexbox, Box-model thì mới có thể hiểu và gõ nhanh các class viết tắt của Tailwind).
```