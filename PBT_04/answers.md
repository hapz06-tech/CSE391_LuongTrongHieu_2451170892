## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Theo luồng văn bản tự nhiên | Có | Layout mặc định của trình duyệt. |
| `relative` | Có | Vị trí gốc của chính nó | Có | Làm mốc tọa độ cho phần tử con `absolute`. |
| `absolute` | Không | Tổ tiên gần nhất có position | Có | Badge "HOT", icon đóng modal, tooltip. |
| `fixed` | Không | Viewport (Khung hình trình duyệt) | Không | Header cố định, nút "Scroll to Top". |
| `sticky` | Có | Viewport khi đạt ngưỡng `top/bottom` | Có | Sidebar dính khi cuộn, Header bảng. |

**Giải đáp câu hỏi thêm:**
- **Khi nào `absolute` tham chiếu `body`?** Khi tất cả các tổ tiên bao ngoài nó đều có `position: static` (mặc định).
- **Khi nào tham chiếu parent?** Khi phần tử cha trực tiếp có thuộc tính `position` là `relative`, `absolute`, hoặc `fixed`.
- **Nearest positioned ancestor:** Là phần tử cha gần nhất trong cây DOM có giá trị `position` khác `static`. Đây là mốc để các giá trị `top`, `right`, `bottom`, `left` của phần tử con bắt đầu tính toán.

---

### Câu A2 — Dự đoán Layout (Flexbox & Grid)

**Trường hợp 1:** 4 items nằm trên một hàng duy nhất, mỗi item chiếm 25% chiều rộng container.

Trường hợp 1:
```text
[ Item 1 ][ Item 2 ][ Item 3 ][ Item 4 ]
```
Trường hợp 2:
```text
[ Item 1 ]   [ Item 2 ]
[ Item 3 ]   [ Item 4 ]
[ Item 5 ]   [ Item 6 ]
```
Tường hợp 3:
```text
| [Logo]      [Menu]      [Buttons] |
```

Trường hợp 4:
```text
| 200px | <--- 1fr (Auto) ---> | 200px |
```

Trường hợp 5:
```text
[ 1 ] [ 2 ] [ 3 ]
[ 4 ] [ 5 ] [ 6 ]
[ 7 ] [   ] [   ]
```
## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

Dưới đây là phân tích lựa chọn công cụ tối ưu cho từng tình huống layout:

| STT | Tình huống layout | Lựa chọn | Giải thích tại sao |
|:---:|:---|:---:|:---|
| 1 | Navigation bar ngang (logo + menu + buttons) | **Flexbox** | Đây là bố cục 1 chiều (ngang). Flexbox xử lý cực tốt việc phân bổ khoảng cách (space-between) và căn giữa các phần tử theo trục dọc (align-items). |
| 2 | Lưới ảnh Instagram (3 cột đều nhau) | **Grid** | Đây là bố cục 2 chiều (hàng và cột) đồng nhất. Grid giúp kiểm soát các ô vuông và khoảng cách (gap) chính xác mà không cần tính toán phần trăm phức tạp. |
| 3 | Layout blog: main content + sidebar | **Grid** | Grid phù hợp cho việc chia khung lớn (Macro Layout). Nó giúp định nghĩa rõ ràng tỷ lệ giữa vùng nội dung chính và sidebar một cách ổn định. |
| 4 | Footer với 4 cột thông tin | **Flexbox** | Footer thường cần sự linh hoạt. Flexbox cho phép các cột này tự động co giãn hoặc nhảy hàng (wrap) khi xem trên thiết bị di động một cách tự nhiên. |
| 5 | Card sản phẩm (nút luôn dính đáy) | **Kết hợp** | Dùng **Grid** để xếp các Card thành lưới. Bên trong mỗi Card dùng **Flexbox (column)** để có thể sử dụng `margin-top: auto` đẩy nút bấm xuống đáy. |



---

### Câu C2 (10đ) — Debug Flexbox

**Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống**
* **Nguyên nhân:** Lượng nội dung (văn bản) ở mỗi Card dài ngắn khác nhau khiến khối chữ không đồng nhất về chiều cao. Mặc dù các Card có chiều cao bằng nhau nhờ container cha, nhưng các thành phần bên trong nó chỉ đang xếp chồng lên nhau theo luồng tự nhiên, không tự co dãn để lấp đầy khoảng trống.
* **Cách sửa:** Biến chính thẻ `.card` thành một Flex container hướng dọc (`column`) và sử dụng `margin-top: auto` để tự động đẩy nút bấm xuống sát đáy.

```css
.card-container { display: flex; flex-wrap: wrap; }
.card { 
    width: 30%; 
    margin: 1.5%; 
    /* Thêm code sửa lỗi: */
    display: flex;
    flex-direction: column;
}
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { 
    padding: 10px; 
    /* Thêm code sửa lỗi: */
    margin-top: auto;
}
```

---

**Lỗi 2: Item vẫn dính góc trái trên (không căn giữa 100vh)**
* **Nguyên nhân:** Thuộc tính `display: flex` mới chỉ kích hoạt môi trường Flexbox cho container `.hero`. Theo mặc định, Flexbox sẽ đặt các phần tử con ở điểm bắt đầu (`flex-start`) của cả trục chính và trục phụ (góc trên cùng bên trái). Bạn thiếu các lệnh điều hướng.
* **Cách sửa:** Thêm thuộc tính `justify-content` để căn giữa theo trục ngang và `align-items` để căn giữa theo trục dọc.

```css
.hero {
    height: 100vh;
    display: flex;
    /* Thêm code sửa lỗi: */
    justify-content: center;
    align-items: center;
}
.hero-content {
    text-align: center;
}
```

---

**Lỗi 3: Sidebar bị co lại khi content quá dài**
* **Nguyên nhân:** Trong Flexbox, tất cả các phần tử con mặc định có thuộc tính `flex-shrink: 1`. Khi phần `.content` có nội dung quá nhiều hoặc chứa hình ảnh lớn, trình duyệt sẽ tự động bóp nhỏ chiều rộng của các phần tử xung quanh (bao gồm cả Sidebar) để nhường chỗ và tránh bị tràn khung.
* **Cách sửa:** Thiết lập `flex-shrink: 0` cho Sidebar để khóa cứng kích thước, ép nó không bao giờ được co lại dưới mức `width` đã định.

```css
.layout { display: flex; }
.sidebar { 
    width: 250px; 
    /* Thêm code sửa lỗi: */
    flex-shrink: 0;
}
.content { flex: 1; }
```

