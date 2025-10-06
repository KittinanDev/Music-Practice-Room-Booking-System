// ✅ Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const res = await apiRequest("/auth/login", "POST", { email, password });
    localStorage.setItem("token", res.token);
    localStorage.setItem("userName", res.user.name);
    localStorage.setItem("userRole", res.user.role);
    alert("เข้าสู่ระบบสำเร็จ!");
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
});

// ✅ Register
document.getElementById("register-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await apiRequest("/auth/register", "POST", { name, email, password });
    alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
    window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
});

// ✅ Logout
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
