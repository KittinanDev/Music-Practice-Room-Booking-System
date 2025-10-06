document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const date = document.getElementById("date").value;
      const startTime = document.getElementById("start").value;
      const endTime = document.getElementById("end").value;

      try {
        const res = await apiRequest("/bookings", "POST", { date, startTime, endTime });
        document.getElementById("msg").textContent = res.message;
      } catch (err) {
        document.getElementById("msg").textContent = "❌ " + err.message;
      }
    });
  }

  // ✅ ถ้ามีหน้า mybookings
  const myList = document.getElementById("my-bookings");
  if (myList) loadMyBookings();
});

async function loadMyBookings() {
  try {
    const data = await apiRequest("/bookings/my");
    const container = document.getElementById("my-bookings");

    if (data.length === 0) {
      container.textContent = "ยังไม่มีการจอง";
      return;
    }

    container.innerHTML = "";
    data.forEach(b => {
      const p = document.createElement("p");
      p.textContent = `${b.date} (${b.startTime} - ${b.endTime}) | สถานะ: ${b.status}`;
      container.appendChild(p);
    });
  } catch (err) {
    document.getElementById("my-bookings").textContent = "❌ " + err.message;
  }
}
