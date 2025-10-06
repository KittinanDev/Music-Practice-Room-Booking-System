// ✅ ไม่มีระบบหลายห้องแล้ว — ตัด loadRooms ออก
// function loadRooms() { ... } ไม่ต้องใช้

function setupAvailabilityChecker() {
  const form = document.getElementById("availability-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    // ✅ เรียก API โดยไม่ต้องส่ง roomId
    const res = await apiRequest(`/bookings/availability?date=${date}&start=${start}&end=${end}`);
    const resultEl = document.getElementById("availability-result");
    resultEl.textContent = res.message;
    resultEl.style.color = res.available ? "green" : "red";

    if (res.available && confirm("ต้องการจองเวลานี้หรือไม่?")) {
      // ✅ ไม่ต้องส่ง roomId ใน body อีกแล้ว
      await apiRequest("/bookings", "POST", { date, startTime: start, endTime: end });
      alert("จองสำเร็จ!");
      loadMyBookings(); // โหลดรายการใหม่ทันที
    }
  });
}

// ✅ โหลดรายการของผู้ใช้
async function loadMyBookings() {
  try {
    const bookings = await apiRequest("/bookings/my");
    const container = document.getElementById("my-bookings");
    container.innerHTML = "";

    if (!bookings || bookings.length === 0) {
      container.innerHTML = "<p>ยังไม่มีการจอง</p>";
      return;
    }

    bookings.forEach(b => {
      const div = document.createElement("div");
      div.className = "booking-card";
      div.innerHTML = `
        <p><strong>วันที่:</strong> ${b.date}</p>
        <p><strong>เวลา:</strong> ${b.startTime} - ${b.endTime}</p>
        <p><strong>ห้อง:</strong> ${b.room?.name || "ห้องซ้อมหลัก"}</p>
        <p><strong>สถานะ:</strong> ${b.status}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("โหลดการจองล้มเหลว:", err);
  }
}

// ✅ เรียกใช้งาน
document.addEventListener("DOMContentLoaded", () => {
  setupAvailabilityChecker();
  loadMyBookings();
});
