document.addEventListener("DOMContentLoaded", async () => {
  const name = localStorage.getItem("name");
  document.getElementById("user-name").textContent = `👤 ${name}`;

  try {
    const data = await apiRequest("/bookings/my");
    const container = document.getElementById("booking-list");
    container.innerHTML = "";

    data.forEach((b, i) => {
      const div = document.createElement("div");
      div.className = "booking-card";
      div.style.animationDelay = `${i * 0.1}s`;
      div.innerHTML = `
        <p>📅 วันที่: ${b.date}</p>
        <p>🕒 เวลา: ${b.startTime} - ${b.endTime}</p>
        <p>📌 สถานะ: ${b.status}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    document.getElementById("booking-list").innerHTML = "⚠️ โหลดข้อมูลไม่สำเร็จ";
  }
});
