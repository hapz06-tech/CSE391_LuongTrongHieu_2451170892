## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Sync vs Async

**1. Dự đoán thứ tự output:**
```text
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

**2. Giải thích cơ chế hoạt động:**
* **Event Loop:** Cơ chế liên tục giám sát Call Stack và các Task Queue. Khi Call Stack trống, nó sẽ ưu tiên bốc toàn bộ task trong Microtask Queue chạy trước, sau đó mới đến Macrotask Queue.
* **Microtask Queue (Hàng đợi vi tác vụ):** Chứa các tác vụ có độ ưu tiên cao nhất, điển hình là các callback của Promise (`.then`, `.catch`). Hàng đợi này sẽ chạy cho đến khi trống rỗng hoàn toàn trước khi Event Loop làm việc khác.
* **Macrotask Queue (Hàng đợi vĩ tác vụ):** Chứa các callback của `setTimeout`, `setInterval`, DOM events, API. Có độ ưu tiên thấp hơn.
* **Luồng chạy cụ thể:**
  1. `console.log("1 - Start")` chạy đồng bộ → **1**.
  2. `setTimeout 0ms` đẩy vào Macrotask Queue.
  3. `Promise.then` thứ nhất đẩy vào Microtask Queue.
  4. `console.log("4 - End")` chạy đồng bộ → **4**.
  5. `setTimeout 100ms` đẩy vào Macrotask Queue.
  6. `Promise.then` thứ hai đẩy vào Microtask Queue.
  7. (Call Stack trống) Chạy Promise 1 → **3**. Chạy Promise 2 → **6**, đẩy `setTimeout 0ms` (nested) vào Macrotask Queue.
  8. (Microtask trống) Lấy task từ Macrotask: Chạy `setTimeout 0ms` đầu tiên → **2**.
  9. Chạy `setTimeout 0ms` (nested) → **7**.
  10. Cuối cùng (đủ 100ms), chạy `setTimeout 100ms` → **5**.

---

### Câu A2 — Fetch API

Giải thích từng dòng code:

1. **`await fetch(...)`:** Hàm `fetch` luôn trả về một **Promise**. Cần dùng `await` để tạm dừng (không block luồng chính) chờ đến khi server phản hồi và Promise này resolve thành đối tượng `Response`.
2. **`response.ok`:** Trả về `false` khi mã trạng thái HTTP không nằm trong khoảng thành công (200-299). 
   * 3 status codes tương ứng: `404` (Not Found), `500` (Internal Server Error), `403` (Forbidden).
3. **`response.json()`:** Hàm này đọc luồng dữ liệu (stream) từ body của response và parse thành JSON. Quá trình này cần thời gian nên nó trả về một Promise. Do đó cần thêm `await` để chờ lấy kết quả object thực sự.
4. **`try...catch`:** Khối catch này bắt các lỗi:
   * **Network error:** (Rớt mạng, lỗi DNS, CORS) khiến `fetch` bị Reject ngay lập tức.
   * **Lỗi ném thủ công (Throw Error):** Khi `!response.ok`, lệnh `throw new Error` ép code nhảy vào catch (vì mặc định fetch không coi 404/500 là lỗi mạng).
   * **JSON parse error:** Nếu server trả về chuỗi text không phải cấu trúc JSON hợp lệ.

---

### Câu A3 — Promise States & Callback Hell

**1. Sơ đồ 3 trạng thái của Promise:**
```text
                  (Thành công)
                  /-----> FULFILLED 
                 /
PENDING (Đang chờ)
                 \
                  \-----> REJECTED 
                  (Thất bại)
```

**2. Callback Hell là gì?**
Là tình trạng khi xử lý nhiều tác vụ bất đồng bộ liên tiếp, các hàm callback bị lồng ghép sâu vào nhau (Pyramid of Doom). Hậu quả là code cực kỳ khó đọc, khó bảo trì và khó bắt lỗi (error handling).

**3. Ví dụ 4 cấp Callback Hell:**
```javascript
getUser("U01", function(user) {
    getCart(user.id, function(cart) {
        checkInventory(cart.items, function(isAvailable) {
            processPayment(cart.total, function(receipt) {
                console.log("Biên lai:", receipt);
            });
        });
    });
});
```

**4. Refactor thành async/await:**
```javascript
async function handleCheckout(userId) {
    try {
        const user = await getUser(userId);
        const cart = await getCart(user.id);
        const isAvailable = await checkInventory(cart.items);
        
        if (isAvailable) {
            const receipt = await processPayment(cart.total);
            console.log("Biên lai:", receipt);
        }
    } catch (error) {
        console.error("Lỗi thanh toán:", error);
    }
}
```

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Error Handling Strategy

**1. Network errors (Mất mạng giữa chừng):**
   * *Xử lý:* Hiển thị Toast thông báo "Mất kết nối Internet, vui lòng kiểm tra lại mạng". Có thể kết hợp nút "Thử lại" hoặc tự động retry.
   
**2. API errors:**
   * *404 (Not Found):* Hiển thị giao diện "Không tìm thấy dữ liệu".
   * *500 (Internal Server Error):* Báo lỗi "Hệ thống đang bảo trì, vui lòng thử lại sau".
   * *429 (Too Many Requests):* Báo lỗi "Bạn thao tác quá nhanh, vui lòng chờ ít phút".

**3. Code Timeout logic (`fetchWithTimeout`):**
```javascript
async function fetchWithTimeout(url, ms = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error(`Request timed out sau ${ms}ms`);
        }
        throw error;
    }
}
```

**4. Code Retry logic (`fetchWithRetry`):**
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP Lỗi: ${response.status}`);
            return response;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            console.warn(`Lỗi fetch, thử lại lần ${i + 1}...`);
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    }
}
```

---

### Câu C2 — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

| Method | Khi nào resolve? | Khi nào reject? | Use case thực tế |
|--------|------------------|-----------------|------------------|
| `.all()` | Khi **TẤT CẢ** các Promise đều resolve. | Khi **BẤT KỲ 1** Promise nào reject. | Tải trang Checkout: Cần đồng thời thông tin User VÀ thông tin Giỏ hàng. Nếu 1 trong 2 lỗi thì hủy toàn bộ không cho thanh toán. |
| `.allSettled()` | Khi **TẤT CẢ** các Promise hoàn thành (dù resolve hay reject). | Không bao giờ reject. | Load Dashboard: Cần load Thời tiết, Giá vàng, Chứng khoán. Cái nào lỗi thì hiện thông báo lỗi riêng lẻ, cái nào thành công vẫn hiển thị bình thường. |
| `.race()` | Khi Promise **ĐẦU TIÊN** resolve. | Khi Promise **ĐẦU TIÊN** reject. | Triển khai Timeout cho Fetch API: Cho fetch đua với setTimeout 5s. Nếu 5s xong trước thì reject báo lỗi timeout. |
| `.any()` | Khi Promise **ĐẦU TIÊN** resolve. | Khi **TẤT CẢ** Promise đều reject. | Tìm server dự phòng: Gọi lấy ảnh cùng lúc từ 3 server CDN. Server nào trả ảnh về nhanh và không lỗi thì lấy ảnh đó. |

**Ví dụ Code cho các Use Case:**

* **1. Ví dụ `Promise.all` (Yêu cầu toàn vẹn 100%):**
```javascript
async function loadCheckout() {
    try {
        const [user, cart] = await Promise.all([
            fetch('/api/user').then(r => r.json()),
            fetch('/api/cart').then(r => r.json())
        ]);
        renderCheckout(user, cart);
    } catch (error) {
        showError("Không thể tải trang thanh toán!");
    }
}
```

* **2. Ví dụ `Promise.allSettled` (Chấp nhận lỗi một phần):**
```javascript
async function loadDashboard() {
    const results = await Promise.allSettled([
        fetch('/api/weather'),
        fetch('/api/news')
    ]);
    
    if (results[0].status === 'fulfilled') renderWeather(results[0].value);
    else renderWeatherError();

    if (results[1].status === 'fulfilled') renderNews(results[1].value);
    else renderNewsError();
}
```

* **3. Ví dụ `Promise.race` (Ép giới hạn thời gian Timeout):**
```javascript
async function fetchWithTimeoutFlag(url) {
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout!")), 3000)
    );
    
    try {
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}
```

* **4. Ví dụ `Promise.any` (Cơ chế fallback):**
```javascript
async function fetchAvatar() {
    try {
        const imgData = await Promise.any([
            fetch('[https://cdn1.example.com/avt.jpg](https://cdn1.example.com/avt.jpg)'),
            fetch('[https://cdn2.example.com/avt.jpg](https://cdn2.example.com/avt.jpg)')
        ]);
        document.getElementById('avatar').src = imgData.url;
    } catch (error) {
        console.error("Tất cả server CDN đều sập!");
    }
}
```