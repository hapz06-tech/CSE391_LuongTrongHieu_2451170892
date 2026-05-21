const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPwd = document.getElementById("confirmPwd");
const phone = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");

const nameIcon = document.getElementById("nameIcon");
const emailError = document.getElementById("emailError");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const confirmIcon = document.getElementById("confirmIcon");
const phoneIcon = document.getElementById("phoneIcon");

const modal = document.getElementById("successModal");
const modalData = document.getElementById("modalData");
const closeModal = document.getElementById("closeModal");

const validity = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

function checkOverallValidity() {
    const isAllValid = Object.values(validity).every(val => val === true);
    submitBtn.disabled = !isAllValid;
}

username.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        nameIcon.textContent = "✅";
        validity.name = true;
    } else {
        nameIcon.textContent = val.length > 0 ? "❌" : "";
        validity.name = false;
    }
    checkOverallValidity();
});

email.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val === "") {
        emailError.textContent = "";
        validity.email = false;
    } else if (emailRegex.test(val)) {
        emailError.textContent = "";
        validity.email = true;
    } else {
        emailError.textContent = "Email không hợp lệ";
        validity.email = false;
    }
    checkOverallValidity();
});

password.addEventListener("input", (e) => {
    const val = e.target.value;
    let strength = 0;
    
    const hasLettersAndNumbers = /(?=.*[A-Za-z])(?=.*\d)/.test(val);
    const isStrong = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(val);

    if (val.length === 0) {
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
        validity.password = false;
    } else if (val.length < 8) {
        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "#e74c3c";
        strengthText.textContent = "Yếu";
        strengthText.style.color = "#e74c3c";
        validity.password = false;
    } else if (val.length >= 8 && isStrong) {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "#28a745";
        strengthText.textContent = "Mạnh";
        strengthText.style.color = "#28a745";
        validity.password = true;
    } else if (val.length >= 8 && hasLettersAndNumbers) {
        strengthBar.style.width = "66%";
        strengthBar.style.backgroundColor = "#f1c40f";
        strengthText.textContent = "Trung bình";
        strengthText.style.color = "#f1c40f";
        validity.password = true;
    } else {
        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "#e74c3c";
        strengthText.textContent = "Yếu";
        strengthText.style.color = "#e74c3c";
        validity.password = false;
    }

    if (confirmPwd.value.length > 0) {
        confirmPwd.dispatchEvent(new Event("input"));
    }
    checkOverallValidity();
});

confirmPwd.addEventListener("input", (e) => {
    const val = e.target.value;
    if (val === "") {
        confirmIcon.textContent = "";
        validity.confirm = false;
    } else if (val === password.value && validity.password) {
        confirmIcon.textContent = "✅";
        validity.confirm = true;
    } else {
        confirmIcon.textContent = "❌";
        validity.confirm = false;
    }
    checkOverallValidity();
});

phone.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "");
    
    if (val.length > 10) {
        val = val.slice(0, 10);
    }

    let formatted = val;
    if (val.length > 4 && val.length <= 7) {
        formatted = `${val.slice(0, 4)}-${val.slice(4)}`;
    } else if (val.length > 7) {
        formatted = `${val.slice(0, 4)}-${val.slice(4, 7)}-${val.slice(7)}`;
    }

    e.target.value = formatted;

    if (val.length === 10) {
        phoneIcon.textContent = "✅";
        validity.phone = true;
    } else {
        phoneIcon.textContent = val.length > 0 ? "❌" : "";
        validity.phone = false;
    }
    checkOverallValidity();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!submitBtn.disabled) {
        modalData.innerHTML = `
            <strong>Họ tên:</strong> ${username.value} <br>
            <strong>Email:</strong> ${email.value} <br>
            <strong>Điện thoại:</strong> ${phone.value}
        `;
        modal.classList.add("show");
    }
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
    form.reset();
    nameIcon.textContent = "";
    emailError.textContent = "";
    confirmIcon.textContent = "";
    phoneIcon.textContent = "";
    strengthBar.style.width = "0%";
    strengthText.textContent = "";
    Object.keys(validity).forEach(k => validity[k] = false);
    checkOverallValidity();
});