// 🔧 แก้ให้เป็น URL ของ Backend จริง (อย่าลืมพอร์ต!)
const API_URL = "http://localhost:5000/api"; 
// หรือถ้าคุณใช้ nodemon/express บนพอร์ตอื่น ให้ใส่ตามจริง เช่น:
// const API_URL = "http://127.0.0.1:3000/api";

async function apiRequest(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}
