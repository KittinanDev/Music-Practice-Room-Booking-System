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
        showAlert("✅ " + res.message, "success");
        document.getElementById("msg").innerHTML = `
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
            ✅ ${res.message}
          </div>
        `;
        form.reset();
      } catch (err) {
        showAlert("❌ " + err.message, "error");
        document.getElementById("msg").innerHTML = `
          <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 16px; border-radius: 12px; font-weight: 600; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">
            ❌ ${err.message}
          </div>
        `;
      }
    });
  }

  // หน้า "การจองของฉัน"
  if (document.getElementById("my-bookings")) {
    createConfirmModal();
    loadMyBookings();
  }
});

async function loadMyBookings() {
  try {
    const data = await apiRequest("/bookings/my");
    const container = document.getElementById("my-bookings");
    container.innerHTML = "";
    
    if (data.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
          <div style="font-size: 80px; margin-bottom: 20px; opacity: 0.5;">📭</div>
          <p style="font-size: 20px; color: #6b7280; font-weight: 600;">ยังไม่มีการจอง</p>
          <p style="color: #9ca3af; margin-top: 8px;">เริ่มจองห้องซ้อมดนตรีกันเลย!</p>
          <a href="index.html" style="display: inline-block; margin-top: 20px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">
            🎸 ไปจองเลย
          </a>
        </div>
      `;
      return;
    }

    data.forEach((b) => {
      const div = document.createElement("div");
      div.className = "booking-card";
      div.style.cssText = `
        background: white;
        border-radius: 16px;
        padding: 24px;
        margin: 16px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        border-left: 5px solid ${getStatusColor(b.status)};
      `;
      
      div.onmouseenter = () => {
        div.style.transform = "translateX(8px)";
        div.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
      };
      div.onmouseleave = () => {
        div.style.transform = "translateX(0)";
        div.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      };

      const statusBadge = `
        <span style="display: inline-block; background: ${getStatusColor(b.status)}; color: white; padding: 6px 16px; border-radius: 20px; font-weight: 600; font-size: 14px;">
          ${getStatusIcon(b.status)} ${getStatusText(b.status)}
        </span>
      `;

      const cancelButton = b.status === "pending" ? `
        <button 
          onclick="cancelBooking('${b._id}')"
          style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 10px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3); margin-top: 12px;"
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 8px rgba(239, 68, 68, 0.4)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(239, 68, 68, 0.3)'">
          🗑️ ยกเลิกการจอง
        </button>
      ` : "";

      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
          <div>
            <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); display: inline-block; padding: 8px 16px; border-radius: 8px; margin-bottom: 12px;">
              <span style="color: white; font-weight: 700; font-size: 18px;">📅 ${b.date}</span>
            </div>
            <p style="color: #374151; font-size: 16px; margin-top: 8px;">
              <span style="font-weight: 600;">⏰ เวลา:</span> 
              <span style="background: #f3f4f6; padding: 4px 12px; border-radius: 6px; margin-left: 8px;">${b.startTime} - ${b.endTime}</span>
            </p>
          </div>
          <div>
            ${statusBadge}
          </div>
        </div>
        ${cancelButton}
      `;
      container.appendChild(div);
    });
  } catch (err) {
    document.getElementById("my-bookings").innerHTML = `
      <div style="text-align: center; padding: 40px 20px; background: #fee2e2; border-radius: 12px; color: #dc2626;">
        <div style="font-size: 60px; margin-bottom: 16px;">❌</div>
        <p style="font-weight: 600; font-size: 18px;">${err.message}</p>
      </div>
    `;
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

function getStatusIcon(status) {
  const icons = {
    pending: "⏳",
    approved: "✅",
    rejected: "❌",
    cancelled: "🚫"
  };
  return icons[status] || "📌";
}

function getStatusText(status) {
  const texts = {
    pending: "รอดำเนินการ",
    approved: "อนุมัติแล้ว",
    rejected: "ปฏิเสธแล้ว",
    cancelled: "ยกเลิกแล้ว"
  };
  return texts[status] || status;
}

function createConfirmModal() {
  if (document.getElementById("confirm-modal")) return;
  
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
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); max-width: 420px; width: 90%; animation: slideDown 0.3s ease;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="font-size: 80px; margin-bottom: 20px;">🗑️</div>
        <h3 style="font-size: 28px; font-weight: 700; color: #1f2937; margin-bottom: 12px;">ยืนยันการยกเลิก</h3>
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">คุณต้องการยกเลิกการจองนี้ใช่หรือไม่?<br>การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
      </div>
      <div style="display: flex; gap: 12px;">
        <button 
          id="modal-cancel"
          style="flex: 1; background: #e5e7eb; color: #374151; padding: 14px 24px; border: none; border-radius: 10px; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.2s;"
          onmouseover="this.style.background='#d1d5db'"
          onmouseout="this.style.background='#e5e7eb'">
          ไม่ยกเลิก
        </button>
        <button 
          id="modal-confirm"
          style="flex: 1; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 14px 24px; border: none; border-radius: 10px; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);"
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 8px rgba(239, 68, 68, 0.4)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(239, 68, 68, 0.3)'">
          ยืนยันยกเลิก
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add animations
  if (!document.getElementById("modal-animations")) {
    const style = document.createElement("style");
    style.id = "modal-animations";
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
}

function showConfirm(onConfirm) {
  const modal = document.getElementById("confirm-modal");
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

async function cancelBooking(id) {
  showConfirm(async () => {
    try {
      const res = await apiRequest(`/bookings/${id}`, "DELETE");
      showAlert("✅ " + res.message, "success");
      loadMyBookings();
    } catch (err) {
      showAlert("❌ " + err.message, "error");
    }
  });
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
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    z-index: 2000;
    font-weight: 600;
    font-size: 16px;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
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