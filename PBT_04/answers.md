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
```text
[ Item 1 ][ Item 2 ][ Item 3 ][ Item 4 ]