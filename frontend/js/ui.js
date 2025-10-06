// 📌 frontend/js/ui.js

// ✅ ถอดรหัส JWT แบบไม่ต้องใช้ library
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("JWT decode error:", err);
    return null;
  }
}

// ✅ แสดงชื่อผู้ใช้บนมุมขวาบน
function showUserBanner() {
  const userInfoEl = document.getElementById("user-info");
  const token = localStorage.getItem("token");

  if (!userInfoEl) return; // ถ้าไม่มี element ก็ไม่ต้องทำอะไร
  if (!token) {
    userInfoEl.textContent = "ยังไม่ได้เข้าสู่ระบบ";
    return;
  }

  const decoded = parseJwt(token);
  if (decoded && decoded.username) {
    userInfoEl.innerHTML = `👤 ยินดีต้อนรับ, <strong>${decoded.username}</strong>`;
  } else if (decoded && decoded.email) {
    userInfoEl.innerHTML = `👤 ยินดีต้อนรับ, <strong>${decoded.email}</strong>`;
  } else {
    userInfoEl.textContent = "👤 เข้าสู่ระบบแล้ว";
  }
}
