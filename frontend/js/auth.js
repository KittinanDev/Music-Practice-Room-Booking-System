document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  // ✅ Login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      try {
        const res = await apiRequest("/auth/login", "POST", { email, password });
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.user.role);
        localStorage.setItem("name", res.user.name);

        alert("เข้าสู่ระบบสำเร็จ!");
        if (res.user.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "index.html";
        }
      } catch (err) {
        alert("เข้าสู่ระบบไม่สำเร็จ: " + err.message);
      }
    });
  }
});

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
