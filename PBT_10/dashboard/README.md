# 📊 Multi-API Dashboard

Bảng điều khiển tổng hợp hiển thị dữ liệu được tải song song từ 3 nguồn API khác nhau, xử lý lỗi độc lập cho từng Widget.

## 🔌 API Đã Sử Dụng
Dự án tích hợp đồng thời 3 APIs thông qua `Promise.allSettled()`:
1. **JSONPlaceholder API** (Lấy bài viết mới): `https://jsonplaceholder.typicode.com/posts?_limit=3`
2. **Dog API** (Lấy ảnh cún ngẫu nhiên): `https://dog.ceo/api/breeds/image/random`
3. **REST Countries API** (Lấy thông tin quốc gia): `https://restcountries.com/v3.1/name/vietnam`

## 🚀 Cách Chạy Ứng Dụng
1. **Cách 1 (Khuyên dùng):** Mở thư mục `dashboard` trong phần mềm VS Code, sau đó dùng extension **Live Server** mở file `index.html`.
2. **Cách 2:** Mở trực tiếp file `index.html` bằng trình duyệt web thông thường.