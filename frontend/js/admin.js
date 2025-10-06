// ✅ โหลดรายการจองทั้งหมด (สำหรับ Admin)
async function loadAllBookings() {
  try {
    const bookings = await apiRequest("/bookings/all"); // ต้องใช้ token ของ admin
    const container = document.getElementById("all-bookings");
    container.innerHTML = "";

    if (!bookings || bookings.length === 0) {
      container.innerHTML = "<p>ยังไม่มีการจอง</p>";
      return;
    }

    // ✅ เรียงวันที่ล่าสุดก่อน
    bookings.sort((a, b) => new Date(b.date) - new Date(a.date));

    bookings.forEach(b => {
      const div = document.createElement("div");
      div.className = "booking-card";

      // สถานะสีต่างกันเล็กน้อย
      let color =
        b.status === "approved" ? "green" :
        b.status === "cancelled" ? "red" : "orange";

      div.innerHTML = `
        <p><strong>ผู้ใช้:</strong> ${b.user?.name || "-"} (${b.user?.email || "-"})</p>
        <p><strong>วันที่:</strong> ${b.date}</p>
        <p><strong>เวลา:</strong> ${b.startTime} - ${b.endTime}</p>
        <p><strong>สถานะ:</strong> <span style="color:${color}">${b.status}</span></p>
        <div class="action-buttons">
          ${
            b.status !== "approved"
              ? `<button class="approve-btn" data-id="${b._id}">✅ อนุมัติ</button>`
              : ""
          }
          ${
            b.status !== "cancelled"
              ? `<button class="cancel-btn" data-id="${b._id}">❌ ยกเลิก</button>`
              : ""
          }
        </div>
      `;
      container.appendChild(div);
    });

    // ✅ Event ปุ่มอนุมัติ/ยกเลิก
    container.addEventListener("click", async (e) => {
      const target = e.target;
      if (target.classList.contains("approve-btn")) {
        const id = target.dataset.id;
        await updateBookingStatus(id, "approved");
      }
      if (target.classList.contains("cancel-btn")) {
        const id = target.dataset.id;
        await updateBookingStatus(id, "cancelled");
      }
    });
  } catch (err) {
    console.error("โหลดข้อมูลล้มเหลว:", err);
  }
}

// ✅ อัปเดตสถานะการจอง
async function updateBookingStatus(id, status) {
  try {
    await apiRequest(`/bookings/${id}`, "PATCH", { status });
    alert("อัปเดตสถานะสำเร็จ!");
    loadAllBookings(); // โหลดใหม่หลังอัปเดต
  } catch (err) {
    console.error("อัปเดตไม่สำเร็จ:", err);
  }
}

// ✅ เมื่อหน้าโหลด
document.addEventListener("DOMContentLoaded", () => {
  loadAllBookings();
});
