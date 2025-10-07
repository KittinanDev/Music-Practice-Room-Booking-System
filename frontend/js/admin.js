document.addEventListener("DOMContentLoaded", async () => {
  const name = localStorage.getItem("name");
  document.getElementById("admin-name").textContent = name;

  await loadStats();
  await loadBookings();
  
  // Create modal for confirmations
  createConfirmModal();
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
      div.className = "booking-card";
      div.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 20px;
        margin: 12px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
      `;
      
      div.onmouseenter = () => {
        div.style.transform = "translateY(-2px)";
        div.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
      };
      div.onmouseleave = () => {
        div.style.transform = "translateY(0)";
        div.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      };

      const statusColor = getStatusColor(b.status);
      
      div.innerHTML = `
        <div style="margin-bottom: 12px;">
          <p style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 4px;">
            ${b.user?.name || "ไม่ระบุ"}
          </p>
          <p style="color: #6b7280; font-size: 14px;">${b.user?.email || "-"}</p>
        </div>
        <div style="background: #f3f4f6; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
          <p style="color: #374151; margin-bottom: 4px;">
            <span style="font-weight: 600;">📅 วันที่:</span> ${b.date}
          </p>
          <p style="color: #374151;">
            <span style="font-weight: 600;">⏰ เวลา:</span> ${b.startTime} - ${b.endTime}
          </p>
        </div>
        <div style="margin-bottom: 16px;">
          <span style="display: inline-block; background: ${statusColor}; color: white; padding: 6px 16px; border-radius: 20px; font-weight: 600; font-size: 14px;">
            ${getStatusText(b.status)}
          </span>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button 
            onclick="approveBooking('${b._id}')"
            style="flex: 1; min-width: 100px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 10px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);"
            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 8px rgba(16, 185, 129, 0.4)'"
            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(16, 185, 129, 0.3)'">
            ✅ อนุมัติ
          </button>
          <button 
            onclick="rejectBooking('${b._id}')"
            style="flex: 1; min-width: 100px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 10px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);"
            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 8px rgba(245, 158, 11, 0.4)'"
            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(245, 158, 11, 0.3)'">
            ⚠️ ปฏิเสธ
          </button>
          <button 
            onclick="cancelBooking('${b._id}')"
            style="flex: 1; min-width: 100px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 10px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);"
            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 8px rgba(239, 68, 68, 0.4)'"
            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(239, 68, 68, 0.3)'">
            🗑️ ยกเลิก
          </button>
        </div>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    document.getElementById("booking-list").textContent = "❌ " + err.message;
  }
}

function getStatusColor(status) {
  const colors = {
    pending: "#f59e0b",
    approved: "#10b981",
    rejected: "#ef4444",
    cancelled: "#6b7280"
  };
  return colors[status] || "#6b7280";
}

function getStatusText(status) {
  const texts = {
    pending: "⏳ รอดำเนินการ",
    approved: "✅ อนุมัติแล้ว",
    rejected: "❌ ปฏิเสธแล้ว",
    cancelled: "🚫 ยกเลิกแล้ว"
  };
  return texts[status] || status;
}

function createConfirmModal() {
  const modal = document.createElement("div");
  modal.id = "confirm-modal";
  modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  `;
  
  modal.innerHTML = `
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); max-width: 400px; width: 90%; animation: slideDown 0.3s ease;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div id="modal-icon" style="font-size: 64px; margin-bottom: 16px;"></div>
        <h3 id="modal-title" style="font-size: 24px; font-weight: 700; color: #1f2937; margin-bottom: 8px;"></h3>
        <p id="modal-message" style="color: #6b7280; font-size: 16px;"></p>
      </div>
      <div style="display: flex; gap: 12px;">
        <button 
          id="modal-cancel"
          style="flex: 1; background: #e5e7eb; color: #374151; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;"
          onmouseover="this.style.background='#d1d5db'"
          onmouseout="this.style.background='#e5e7eb'">
          ยกเลิก
        </button>
        <button 
          id="modal-confirm"
          style="flex: 1; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 4px rgba(139, 92, 246, 0.3);"
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 8px rgba(139, 92, 246, 0.4)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(139, 92, 246, 0.3)'">
          ยืนยัน
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add animations
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideDown {
      from { transform: translate(-50%, -60%); opacity: 0; }
      to { transform: translate(-50%, -50%); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

function showConfirm(title, message, icon, onConfirm) {
  const modal = document.getElementById("confirm-modal");
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-message").textContent = message;
  document.getElementById("modal-icon").textContent = icon;
  
  modal.style.display = "block";
  
  const confirmBtn = document.getElementById("modal-confirm");
  const cancelBtn = document.getElementById("modal-cancel");
  
  const closeModal = () => {
    modal.style.display = "none";
  };
  
  confirmBtn.onclick = () => {
    closeModal();
    onConfirm();
  };
  
  cancelBtn.onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
}

async function approveBooking(id) {
  showConfirm(
    "อนุมัติการจอง",
    "คุณต้องการอนุมัติการจองนี้ใช่หรือไม่?",
    "✅",
    () => updateStatus(id, "approved")
  );
}

async function rejectBooking(id) {
  showConfirm(
    "ปฏิเสธการจอง",
    "คุณต้องการปฏิเสธการจองนี้ใช่หรือไม่?",
    "⚠️",
    () => updateStatus(id, "rejected")
  );
}

async function cancelBooking(id) {
  showConfirm(
    "ยกเลิกการจอง",
    "คุณต้องการลบการจองนี้อย่างถาวรใช่หรือไม่?",
    "🗑️",
    async () => {
      try {
        const res = await apiRequest(`/bookings/${id}`, "DELETE");
        showAlert(res.message, "success");
        loadBookings();
      } catch (err) {
        showAlert("❌ " + err.message, "error");
      }
    }
  );
}

async function updateStatus(id, status) {
  try {
    const res = await apiRequest(`/bookings/${id}`, "PATCH", { status });
    showAlert(res.message, "success");
    loadBookings();
  } catch (err) {
    showAlert("❌ " + err.message, "error");
  }
}

function showAlert(message, type = "info") {
  const alert = document.createElement("div");
  const bgColor = type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6";
  
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${bgColor};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 2000;
    font-weight: 600;
    animation: slideInRight 0.3s ease;
  `;
  
  alert.textContent = message;
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => alert.remove(), 300);
  }, 3000);
  
  // Add slide animations
  if (!document.getElementById("alert-animations")) {
    const style = document.createElement("style");
    style.id = "alert-animations";
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}