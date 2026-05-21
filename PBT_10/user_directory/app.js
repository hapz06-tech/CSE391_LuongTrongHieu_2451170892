const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);
        if (!res.ok) throw new Error(`Lỗi tải danh sách: HTTP ${res.status}`);
        return res.json();
    },
    async createUser(data) {
        const res = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!res.ok) throw new Error("Không thể thêm người dùng mới");
        return res.json();
    },
    async updateUser(id, data) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!res.ok) throw new Error("Không thể cập nhật thông tin");
        return res.json();
    },
    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error("Không thể xóa người dùng");
        return true;
    }
};

const ui = {
    loadingEl: document.getElementById("loading"),
    gridEl: document.getElementById("usersGrid"),
    toastContainer: document.getElementById("toastContainer"),

    renderUsers(users) {
        this.gridEl.innerHTML = "";
        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>📧 ${user.email}</p>
                <p>📞 ${user.phone}</p>
                <div class="card-actions">
                    <button class="btn btn-secondary edit-btn" data-id="${user.id}">Sửa</button>
                    <button class="btn btn-danger delete-btn" data-id="${user.id}">Xóa</button>
                </div>
            `;
            this.gridEl.appendChild(card);
        });
    },

    showLoading() {
        this.loadingEl.classList.remove("hidden");
        this.gridEl.classList.add("hidden");
    },

    hideLoading() {
        this.loadingEl.classList.add("hidden");
        this.gridEl.classList.remove("hidden");
    },

    showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        this.toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    showError(message) {
        this.showToast(message, "error");
    },

    showSuccess(message) {
        this.showToast(message, "success");
    }
};

let usersList = [];

const searchInput = document.getElementById("searchInput");
const addBtn = document.getElementById("addBtn");
const userModal = document.getElementById("userModal");
const userForm = document.getElementById("userForm");
const cancelBtn = document.getElementById("cancelBtn");
const modalTitle = document.getElementById("modalTitle");

const userIdInput = document.getElementById("userId");
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");
const userPhoneInput = document.getElementById("userPhone");

async function init() {
    try {
        ui.showLoading();
        usersList = await api.getUsers();
        ui.renderUsers(usersList);
    } catch (error) {
        ui.showError(error.message);
    } finally {
        ui.hideLoading();
    }
}

function filterUsers() {
    const query = searchInput.value.toLowerCase();
    const filtered = usersList.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query)
    );
    ui.renderUsers(filtered);
}

function openModal(user = null) {
    if (user) {
        modalTitle.textContent = "Cập nhật User";
        userIdInput.value = user.id;
        userNameInput.value = user.name;
        userEmailInput.value = user.email;
        userPhoneInput.value = user.phone;
    } else {
        modalTitle.textContent = "Thêm User Mới";
        userForm.reset();
        userIdInput.value = "";
    }
    userModal.classList.remove("hidden");
}

function closeModal() {
    userModal.classList.add("hidden");
}

userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = userIdInput.value;
    const userData = {
        name: userNameInput.value.trim(),
        email: userEmailInput.value.trim(),
        phone: userPhoneInput.value.trim()
    };

    try {
        if (id) {
            let updatedUser = await api.updateUser(id, userData);
            if (!updatedUser.id) updatedUser.id = parseInt(id);
            const index = usersList.findIndex(u => u.id == id);
            if (index !== -1) usersList[index] = { ...usersList[index], ...userData };
            ui.showSuccess("Cập nhật thành công!");
        } else {
            const newUser = await api.createUser(userData);
            usersList.unshift({ ...newUser, id: Date.now() });
            ui.showSuccess("Thêm mới thành công!");
        }
        closeModal();
        filterUsers();
    } catch (error) {
        ui.showError(error.message);
    }
});

ui.gridEl.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-btn")) {
        const id = e.target.dataset.id;
        const user = usersList.find(u => u.id == id);
        if (user) openModal(user);
    }

    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        if (confirm("Bạn có chắc chắn muốn xóa user này không?")) {
            try {
                await api.deleteUser(id);
                usersList = usersList.filter(u => u.id != id);
                filterUsers();
                ui.showSuccess("Đã xóa user thành công!");
            } catch (error) {
                ui.showError(error.message);
            }
        }
    }
});

searchInput.addEventListener("input", filterUsers);
addBtn.addEventListener("click", () => openModal());
cancelBtn.addEventListener("click", closeModal);

init();