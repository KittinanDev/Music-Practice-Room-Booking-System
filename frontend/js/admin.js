document.addEventListener("DOMContentLoaded", async () => {
  try {
    // ✅ โหลดจำนวนทั้งหมด
    const countData = await apiRequest("/bookings/count");
    document.getElementById("count").textContent = countData.total;

    // ✅ โหลดรายการทั้งหมด
    const bookings = await apiRequest("/bookings/all");
    const div = document.getElementById("all-bookings");
    div.innerHTML = "";

    bookings.forEach((b) => {
      const p = document.createElement("p");
      p.textContent = `${b.date} (${b.startTime} - ${b.endTime}) | ${b.user?.name || "ไม่ระบุ"} | ${b.status}`;
      div.appendChild(p);
    });
  } catch (err) {
    document.getElementById("all-bookings").textContent = "❌ " + err.message;
  }
});
