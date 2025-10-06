const token = localStorage.getItem("token");

async function loadDashboard() {
  const [userRes, roomRes, bookingRes] = await Promise.all([
    fetch("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
    fetch("/api/admin/rooms", { headers: { Authorization: `Bearer ${token}` } }),
    fetch("/api/admin/bookings", { headers: { Authorization: `Bearer ${token}` } })
  ]);

  const [users, rooms, bookings] = await Promise.all([
    userRes.json(), roomRes.json(), bookingRes.json()
  ]);

  document.getElementById("totalUsers").textContent = users.length;
  document.getElementById("totalRooms").textContent = rooms.length;

  const today = new Date().toLocaleDateString();
  const todayCount = bookings.filter(b => new Date(b.date).toLocaleDateString() === today).length;
  document.getElementById("todayBookings").textContent = todayCount;

  loadCharts(bookings);
}

function loadCharts(bookings) {
  // 1️⃣ กราฟรายวัน
  const daily = {};
  bookings.forEach(b => {
    const d = new Date(b.date).toLocaleDateString('th-TH');
    daily[d] = (daily[d] || 0) + 1;
  });

  new Chart(document.getElementById("chartBookings"), {
    type: "line",
    data: {
      labels: Object.keys(daily),
      datasets: [{
        label: "จำนวนการจองต่อวัน",
        data: Object.values(daily),
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      plugins: { legend: { labels: { color: "#fff" } } },
      scales: {
        x: { ticks: { color: "#94a3b8" } },
        y: { ticks: { color: "#94a3b8" } }
      }
    }
  });

  // 2️⃣ กราฟรายห้อง
  const roomStats = {};
  bookings.forEach(b => {
    const name = b.room?.name || "ไม่ระบุ";
    roomStats[name] = (roomStats[name] || 0) + 1;
  });

  new Chart(document.getElementById("chartRooms"), {
    type: "bar",
    data: {
      labels: Object.keys(roomStats),
      datasets: [{
        label: "จำนวนการจองต่อห้อง",
        data: Object.values(roomStats),
        backgroundColor: "#fbbf24"
      }]
    },
    options: {
      plugins: { legend: { labels: { color: "#fff" } } },
      scales: {
        x: { ticks: { color: "#94a3b8" } },
        y: { ticks: { color: "#94a3b8" } }
      }
    }
  });
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "../login.html";
}

loadDashboard();
