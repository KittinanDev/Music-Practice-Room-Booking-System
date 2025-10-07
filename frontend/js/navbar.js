// โหลด navbar.html มาทุกหน้าที่มี <div id="navbar-container">
document.addEventListener("DOMContentLoaded", async () => {
  const navbarContainer = document.getElementById("navbar-container");
  if (!navbarContainer) return;

  try {
    const res = await fetch("components/navbar.html");
    const html = await res.text();
    navbarContainer.innerHTML = html;

    // แสดงชื่อผู้ใช้
    const name = localStorage.getItem("name") || "ผู้ใช้";
    const role = localStorage.getItem("role") || "user";
    const userDisplay = document.getElementById("user-display");
    if (userDisplay) userDisplay.textContent = `${name} (${role})`;

    // ปุ่ม Logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        if (confirm("คุณต้องการออกจากระบบหรือไม่?")) {
          localStorage.clear();
          window.location.href = "login.html";
        }
      });
    }
  } catch (err) {
    console.error("โหลด Navbar ไม่สำเร็จ:", err);
  }
});

// ถ้าไม่มี token → กลับไปหน้า login
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}
