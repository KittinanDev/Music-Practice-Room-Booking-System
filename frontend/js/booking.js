document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("name");
  const userEl = document.getElementById("username");
  if (userEl) userEl.textContent = name || "ผู้ใช้";

  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const date = document.getElementById("date").value;
      const startTime = document.getElementById("start").value;
      const endTime = document.getElementById("end").value;
      try {
        const res = await apiRequest("/bookings", "POST", { date, startTime, endTime });
        document.getElementById("msg").textContent = "✅ " + res.message;
      } catch (err) {
        document.getElementById("msg").textContent = "❌ " + err.message;
      }
    });
  }

  // หน้า “การจองของฉัน”
  if (document.getElementById("my-bookings")) {
    loadMyBookings();
  }
});

async function loadMyBookings() {
  try {
    const data = await apiRequest("/bookings/my");
    const container = document.getElementById("my-bookings");
    container.innerHTML = "";
    if (data.length === 0) return container.textContent = "ยังไม่มีการจอง";

    data.forEach((b) => {
      const div = document.createElement("div");
      div.style.border = "1px solid #ccc";
      div.style.margin = "8px";
      div.style.padding = "8px";
      div.innerHTML = `
        <p><b>วันที่:</b> ${b.date}</p>
        <p><b>เวลา:</b> ${b.startTime} - ${b.endTime}</p>
        <p><b>สถานะ:</b> ${b.status}</p>
        ${
          b.status === "pending"
            ? `<button onclick="cancelBooking('${b._id}')">ยกเลิก</button>`
            : ""
        }
      `;
      container.appendChild(div);
    });
  } catch (err) {
    document.getElementById("my-bookings").textContent = "❌ " + err.message;
  }
}

async function cancelBooking(id) {
  if (!confirm("ยืนยันการยกเลิก?")) return;
  try {
    const res = await apiRequest(`/bookings/${id}`, "DELETE");
    alert(res.message);
    loadMyBookings();
  } catch (err) {
    alert("❌ " + err.message);
  }
}
