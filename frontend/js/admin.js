document.addEventListener("DOMContentLoaded", async () => {
  const name = localStorage.getItem("name");
  document.getElementById("admin-name").textContent = name;

  await loadStats();
  await loadBookings();
});

async function loadStats() {
  try {
    const stats = await apiRequest("/bookings/stats");
    document.getElementById("count").textContent = stats.total;
  } catch (err) {
    document.getElementById("count").textContent = "❌ " + err.message;
  }
}

async function loadBookings(page = 1) {
  try {
    const data = await apiRequest(`/bookings/all?page=${page}&limit=10`);
    const list = document.getElementById("booking-list");
    list.innerHTML = "";

    data.bookings.forEach((b) => {
      const div = document.createElement("div");
      div.style.border = "1px solid #ccc";
      div.style.margin = "8px";
      div.style.padding = "8px";

      div.innerHTML = `
        <p><b>${b.user?.name || "ไม่ระบุ"}</b> (${b.user?.email || "-"})</p>
        <p>${b.date} | ${b.startTime}-${b.endTime}</p>
        <p>สถานะ: <b>${b.status}</b></p>
        <button onclick="approveBooking('${b._id}')">อนุมัติ</button>
        <button onclick="rejectBooking('${b._id}')">ปฏิเสธ</button>
        <button onclick="cancelBooking('${b._id}')">ยกเลิก</button>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    document.getElementById("booking-list").textContent = "❌ " + err.message;
  }
}

async function approveBooking(id) {
  if (!confirm("อนุมัติการจองนี้?")) return;
  await updateStatus(id, "approved");
}

async function rejectBooking(id) {
  if (!confirm("ปฏิเสธการจองนี้?")) return;
  await updateStatus(id, "rejected");
}

async function cancelBooking(id) {
  if (!confirm("ยกเลิกการจองนี้?")) return;
  try {
    const res = await apiRequest(`/bookings/${id}`, "DELETE");
    alert(res.message);
    loadBookings();
  } catch (err) {
    alert("❌ " + err.message);
  }
}

async function updateStatus(id, status) {
  try {
    const res = await apiRequest(`/bookings/${id}`, "PATCH", { status });
    alert(res.message);
    loadBookings();
  } catch (err) {
    alert("❌ " + err.message);
  }
}
