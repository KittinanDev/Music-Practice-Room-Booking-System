// ตรวจสอบ token และ role ก่อนเข้าแต่ละหน้า
async function checkAuth(requiredRole) {
  const token = localStorage.getItem("token");
  if (!token) return window.location.href = "/login.html";

  const res = await fetch("/api/user/profile", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json();

  if (data.role !== requiredRole) {
    alert("คุณไม่มีสิทธิ์เข้าหน้านี้");
    window.location.href = data.role === "user" ? "/user/dashboard.html" : "/admin/dashboard.html";
  }
}
