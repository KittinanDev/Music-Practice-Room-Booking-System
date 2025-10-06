// 📌 frontend/js/api.js
const API_URL = "http://localhost:5000/api";

// ✅ ดึง token จาก localStorage
function getToken() {
  return localStorage.getItem("token");
}

// ✅ ฟังก์ชันหลักสำหรับเรียก API
async function apiRequest(endpoint, method = "GET", data = null) {
  const headers = { "Content-Type": "application/json" };

  // ถ้ามี token จะส่งใน header ด้วย
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  // ถ้า token หมดอายุ หรือไม่ได้ login
  if (res.status === 401) {
    alert("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่");
    localStorage.removeItem("token");
    window.location = "login.html";
    return;
  }

  return res.json();
}
