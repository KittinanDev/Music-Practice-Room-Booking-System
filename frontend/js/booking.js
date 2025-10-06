async function loadRooms() {
  const rooms = await apiRequest("/rooms");
  const list = document.getElementById("room-list");
  const select = document.getElementById("room-select");
  list.innerHTML = "";
  select.innerHTML = "";
  rooms.forEach(room => {
    const div = document.createElement("div");
    div.className = "room-card";
    div.innerHTML = `<h3>${room.name}</h3><p>ความจุ: ${room.capacity}</p>`;
    list.appendChild(div);

    const option = document.createElement("option");
    option.value = room._id;
    option.textContent = room.name;
    select.appendChild(option);
  });
}

function setupAvailabilityChecker() {
  const form = document.getElementById("availability-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const roomId = document.getElementById("room-select").value;
    const date = document.getElementById("date").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    const res = await apiRequest(`/bookings/availability?roomId=${roomId}&date=${date}&start=${start}&end=${end}`);
    const resultEl = document.getElementById("availability-result");
    resultEl.textContent = res.message;
    resultEl.style.color = res.available ? "green" : "red";

    if (res.available && confirm("ต้องการจองเวลานี้หรือไม่?")) {
      await apiRequest("/bookings", "POST", { room: roomId, date, startTime: start, endTime: end });
      alert("จองสำเร็จ!");
    }
  });
}

async function loadMyBookings() {
  const bookings = await apiRequest("/bookings/my");
  const container = document.getElementById("my-bookings");
  container.innerHTML = "";
  bookings.forEach(b => {
    const div = document.createElement("div");
    div.className = "booking-card";
    div.innerHTML = `
      <p>ห้อง: ${b.room.name}</p>
      <p>วันที่: ${b.date}</p>
      <p>${b.startTime} - ${b.endTime}</p>
      <p>สถานะ: ${b.status}</p>
    `;
    container.appendChild(div);
  });
}
