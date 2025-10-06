// ✅ ตรวจสอบสิทธิ์ก่อนเข้า Admin
async function checkAdminAccess() {
  const token = getToken();
  if (!token) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return (window.location = "login.html");
  }

  // ตรวจสอบ role ผ่าน API (decode JWT ใน backend)
  const data = await apiRequest("/rooms"); // ถ้าไม่ใช่ admin จะโดน 403
  if (data.message === "เฉพาะผู้ดูแลระบบเท่านั้น") {
    alert("เข้าถึงได้เฉพาะผู้ดูแลระบบ");
    window.location = "index.html";
  }
}

// ✅ โหลดรายการจองทั้งหมด
async function loadAllBookings() {
  const container = document.getElementById("admin-bookings");
  const bookings = await apiRequest("/bookings/all");

  container.innerHTML = "";
  bookings.forEach((b) => {
    const div = document.createElement("div");
    div.className = "booking-card";
    div.innerHTML = `
      <p><strong>ห้อง:</strong> ${b.room?.name || "N/A"}</p>
      <p><strong>ผู้จอง:</strong> ${b.user?.username || "N/A"}</p>
      <p><strong>วันที่:</strong> ${b.date}</p>
      <p><strong>เวลา:</strong> ${b.startTime} - ${b.endTime}</p>
      <p><strong>สถานะ:</strong> 
        <span style="color:${b.status === "approved" ? "green" : b.status === "cancelled" ? "red" : "gray"};">
          ${b.status}
        </span>
      </p>
      <div class="admin-actions">
        ${
          b.status !== "approved"
            ? `<button onclick="approveBooking('${b._id}')">✅ อนุมัติ</button>`
            : ""
        }
        ${
          b.status !== "cancelled"
            ? `<button onclick="cancelBooking('${b._id}')">❌ ยกเลิก</button>`
            : ""
        }
      </div>
    `;
    container.appendChild(div);
  });
}

// ✅ อนุมัติการจอง
async function approveBooking(id) {
  if (confirm("ต้องการอนุมัติการจองนี้หรือไม่?")) {
    await apiRequest(`/bookings/${id}`, "PATCH", { status: "approved" });
    alert("✅ อนุมัติเรียบร้อย");
    loadAllBookings();
  }
}

// ✅ ยกเลิกการจอง
async function cancelBooking(id) {
  if (confirm("ต้องการยกเลิกการจองนี้หรือไม่?")) {
    await apiRequest(`/bookings/${id}`, "PATCH", { status: "cancelled" });
    alert("❌ ยกเลิกเรียบร้อย");
    loadAllBookings();
  }
}

// ✅ โหลดรายชื่อห้อง + ปุ่มลบ
async function loadRoomsAdmin() {
  const list = document.getElementById("room-list-admin");
  const rooms = await apiRequest("/rooms");
  list.innerHTML = "";
  rooms.forEach((r) => {
    const div = document.createElement("div");
    div.className = "room-card";
    div.innerHTML = `
      <h3>${r.name}</h3>
      <p>ความจุ: ${r.capacity}</p>
      <p>อุปกรณ์: ${r.equipment.join(", ")}</p>
      <button onclick="deleteRoom('${r._id}')">ลบห้อง</button>
    `;
    list.appendChild(div);
  });
}

// ✅ เพิ่มห้องใหม่
function setupRoomForm() {
  const form = document.getElementById("room-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("room-name").value;
    const capacity = parseInt(document.getElementById("room-capacity").value);
    const equipment = document
      .getElementById("room-equipment")
      .value.split(",");

    const res = await apiRequest("/rooms", "POST", { name, capacity, equipment });
    if (res._id) {
      alert("✅ เพิ่มห้องสำเร็จ");
      form.reset();
      loadRoomsAdmin();
    } else alert(res.message);
  });
}

// ✅ ลบห้อง
async function deleteRoom(id) {
  if (confirm("ต้องการลบห้องนี้หรือไม่?")) {
    await apiRequest(`/rooms/${id}`, "DELETE");
    alert("🗑️ ลบห้องแล้ว");
    loadRoomsAdmin();
  }
}
