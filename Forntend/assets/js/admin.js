// โหลดกราฟจำนวนการจอง
fetch("/api/admin/bookings", {
  headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
})
  .then(res => res.json())
  .then(data => {
    const labels = data.map(b => new Date(b.date).toLocaleDateString());
    const chartData = data.map(b => 1);
    new Chart(document.getElementById("bookingChart"), {
      type: "bar",
      data: { labels, datasets: [{ label: "จำนวนการจอง", data: chartData }] }
    });
  });
const token = localStorage.getItem("token");

// โหลดผู้ใช้ทั้งหมด
async function loadUsers() {
  const res = await fetch("/api/admin/users", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const users = await res.json();
  const table = document.querySelector("#userTable tbody");
  table.innerHTML = users.map(u => `
    <tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.role}</td>
      <td>
        <button onclick="editUser('${u._id}')">✏️</button>
        <button onclick="deleteUser('${u._id}')">🗑️</button>
      </td>
    </tr>
  `).join("");
}

// ลบผู้ใช้
async function deleteUser(id) {
  if (!confirm("ต้องการลบผู้ใช้นี้ใช่ไหม?")) return;
  await fetch(`/api/admin/user/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  alert("ลบเรียบร้อย!");
  loadUsers();
}

// ไปหน้าแก้ไข
function editUser(id) {
  window.location = `add-edit.html?type=user&id=${id}`;
}

async function handleAddEdit(type, id) {
  const form = document.getElementById("editForm");

  // ถ้าเป็นโหมดแก้ไข → โหลดข้อมูล
  if (id) {
    const res = await fetch(`/api/admin/${type}s/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("role").value = data.role;
  }

  // เมื่อบันทึก
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const body = {
      name: form.name.value,
      email: form.email.value,
      role: form.role.value
    };
    const method = id ? "PUT" : "POST";
    await fetch(`/api/admin/${type}${id ? "/" + id : ""}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    alert("บันทึกสำเร็จ!");
    window.location = `${type}s.html`;
  });
}

async function loadCharts() {
  const res = await fetch("/api/admin/bookings", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const bookings = await res.json();

  // 1️⃣ กราฟจำนวนการจองรายวัน
  const dates = {};
  bookings.forEach(b => {
    const d = new Date(b.date).toLocaleDateString();
    dates[d] = (dates[d] || 0) + 1;
  });

  new Chart(document.getElementById("chartBookings"), {
    type: "line",
    data: {
      labels: Object.keys(dates),
      datasets: [{
        label: "จำนวนการจองรายวัน",
        data: Object.values(dates)
      }]
    }
  });

  // 2️⃣ กราฟจำนวนการจองต่อห้อง
  const rooms = {};
  bookings.forEach(b => {
    const r = b.room.name;
    rooms[r] = (rooms[r] || 0) + 1;
  });

  new Chart(document.getElementById("chartRooms"), {
    type: "bar",
    data: {
      labels: Object.keys(rooms),
      datasets: [{
        label: "จำนวนการจองต่อห้อง",
        data: Object.values(rooms)
      }]
    }
  });
}
