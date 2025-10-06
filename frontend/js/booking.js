// ✅ ตรวจสอบเวลาว่างและจอง
document.getElementById("availability-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const date = document.getElementById("date").value;
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  try {
    const res = await apiRequest(`/bookings/availability?date=${date}&start=${start}&end=${end}`);
    const result = document.getElementById("availability-result");
    result.textContent = res.message;
    result.style.color = res.available ? "green" : "red";

    if (res.available && confirm("ต้องการจองเวลานี้หรือไม่?")) {
      await apiRequest("/bookings", "POST", { date, startTime: start, endTime: end });
      alert("จองสำเร็จ!");
    }
  } catch (err) {
    alert(err.message);
  }
});

// ✅ โหลดรายการจองของฉัน
async function loadMyBookings() {
  try {
    const res = await apiRequest("/bookings/my");
    const container = document.getElementById("my-bookings");
    container.innerHTML = "";
    res.forEach((b) => {
      const div = document.createElement("div");
      div.className = "booking-card";
      div.innerHTML = `
        <p>📅 วันที่: ${b.date}</p>
        <p>🕐 เวลา: ${b.startTime} - ${b.endTime}</p>
        <p>📌 สถานะ: ${b.status}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    alert(err.message);
  }
}

// ✅ โหลดรายการจองของฉัน
async function loadMyBookings() {
  try {
    const res = await apiRequest("/bookings/my");
    const container = document.getElementById("my-bookings");
    container.innerHTML = "";

    res.forEach((b, index) => {
      const div = document.createElement("div");
      div.className = "booking-card";
      div.style.animationDelay = `${index * 0.1}s`;
      div.innerHTML = `
        <p>📅 วันที่: ${b.date}</p>
        <p>🕐 เวลา: ${b.startTime} - ${b.endTime}</p>
        <p>📌 สถานะ: ${b.status}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    alert(err.message);
  }
}

// ✅ โหลดรายการทั้งหมด (Admin)
async function loadAllBookings() {
  try {
    const res = await apiRequest("/bookings/all");
    const container = document.getElementById("all-bookings");
    container.innerHTML = "";

    res.forEach((b, index) => {
      const div = document.createElement("div");
      div.className = "booking-card";
      div.style.animationDelay = `${index * 0.1}s`;
      div.innerHTML = `
        <p>👤 ผู้ใช้: ${b.user?.name || "-"}</p>
        <p>📅 วันที่: ${b.date}</p>
        <p>${b.startTime} - ${b.endTime}</p>
        <p>สถานะ: ${b.status}</p>
        <button onclick="updateStatus('${b._id}','approved')">อนุมัติ</button>
        <button onclick="updateStatus('${b._id}','cancelled')">ยกเลิก</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    alert(err.message);
  }
}
