document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loader = document.getElementById("loader");

  // ✅ LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      loader.style.display = "block";

      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
        const res = await apiRequest("/auth/login", "POST", { email, password });
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.user.role);
        localStorage.setItem("name", res.user.name);

        loader.style.display = "none";
        alert("✅ เข้าสู่ระบบสำเร็จ!");

        if (res.user.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "index.html";
        }
      } catch {
        loader.style.display = "none";
        alert("❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    });
  }

  // ✅ REGISTER
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      loader.style.display = "block";

      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
        await apiRequest("/auth/register", "POST", { name, email, password });
        loader.style.display = "none";
        alert("✅ สมัครสมาชิกสำเร็จ! โปรดเข้าสู่ระบบ");
        window.location.href = "login.html";
      } catch {
        loader.style.display = "none";
        alert("❌ สมัครไม่สำเร็จ (อีเมลอาจซ้ำ)");
      }
    });
  }
});

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
