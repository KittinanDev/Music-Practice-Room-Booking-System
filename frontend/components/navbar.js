// ✅ โหลด navbar จาก components/navbar.html
fetch("components/navbar.html")
  .then(res => res.text())
  .then(html => {
    // แทรก navbar ด้านบนสุดของหน้า
    document.body.insertAdjacentHTML("afterbegin", html);

    // ✅ Event: คลิกโลโก้ → ไปหน้า index
    document.getElementById("logo").addEventListener("click", () => {
      window.location.href = "index.html";
    });

    // ✅ Event: กดออกจากระบบ → popup ยืนยัน
    document.getElementById("logout-btn").addEventListener("click", () => {
      const confirmLogout = confirm("คุณแน่ใจหรือไม่ว่าจะออกจากระบบ?");
      if (confirmLogout) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "login.html";
      }
    });
  })
  .catch(err => console.error("โหลด navbar ไม่สำเร็จ:", err));
