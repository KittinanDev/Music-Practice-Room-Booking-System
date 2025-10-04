const API_URL = "http://localhost:5000/api/bookings";

const datePicker = document.getElementById('datePicker');
const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');
const roomStatus = document.getElementById('roomStatus');
const bookBtn = document.getElementById('bookBtn');
const formSection = document.getElementById('formSection');
const confirmBtn = document.getElementById('confirmBtn');
const bookingList = document.getElementById('bookingList');

const today = new Date().toISOString().split('T')[0];
datePicker.value = today;

// โหลดรายการจองเมื่อเลือกวัน
datePicker.addEventListener('change', loadBookings);

async function loadBookings() {
  const res = await fetch(`${API_URL}/check?date=${datePicker.value}`);
  const bookings = await res.json();
  roomStatus.textContent = bookings.length > 0 ? "❌ จองแล้ว" : "✅ ว่าง";
  showMyBookings();
}

bookBtn.addEventListener('click', () => {
  formSection.classList.remove('hidden');
});

confirmBtn.addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  if (!name || !phone || !startTime.value || !endTime.value) {
    alert("⚠️ กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  const booking = {
    name,
    phone,
    room: "ห้องซ้อมดนตรี",
    date: datePicker.value,
    startTime: startTime.value,
    endTime: endTime.value
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking)
  });

  if (res.ok) {
    alert("✅ จองสำเร็จ!");
    formSection.classList.add('hidden');
    loadBookings();
  }
});

// แสดงรายการจองทั้งหมด
async function showMyBookings() {
  const res = await fetch(API_URL);
  const data = await res.json();
  bookingList.innerHTML = "";
  data.forEach((b) => {
    const li = document.createElement("li");
    li.textContent = `${b.name} (${b.date} ${b.startTime}-${b.endTime}) [${b.status}]`;

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "ยกเลิก";
    cancelBtn.onclick = async () => {
      await fetch(`${API_URL}/${b._id}`, { method: "DELETE" });
      loadBookings();
    };

    li.appendChild(cancelBtn);
    bookingList.appendChild(li);
  });
}

// โหลดครั้งแรก
loadBookings();
