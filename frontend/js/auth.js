const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    const data = await apiRequest("/auth/login", "POST", {
      email: emailInput,
      password: passwordInput,
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("เข้าสู่ระบบสำเร็จ");
      window.location = "index.html";
    } else {
      alert(data.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = await apiRequest("/auth/register", "POST", { username, email, password });
    if (data.token) {
      alert("สมัครสำเร็จ! กรุณาเข้าสู่ระบบ");
      window.location = "login.html";
    } else alert(data.message);
  });
}

function logout() {
  localStorage.removeItem("token");
  window.location = "login.html";
}

if (data.token) {
  localStorage.setItem("token", data.token); // ✅ บันทึก token ไว้ใช้ต่อ
  alert("เข้าสู่ระบบสำเร็จ");
  window.location = "index.html";
}
