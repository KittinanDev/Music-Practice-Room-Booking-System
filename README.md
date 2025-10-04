# 🎵 ระบบจองห้องซ้อมดนตรี (Music Practice Room Booking System)

![GitHub stars](https://img.shields.io/github/stars/Kittinan-Dev/Music-practice-room-booking-system?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/Kittinan-Dev/Music-practice-room-booking-system?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/Kittinan-Dev/Music-practice-room-booking-system?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge)

---

## 📌 ภาพรวม (Overview)
**Music Practice Room Booking System** คือเว็บแอปพลิเคชันที่พัฒนาขึ้นเพื่อจัดการการจองห้องซ้อมดนตรี  
ช่วยให้นักศึกษา อาจารย์ และผู้ดูแลสามารถ **จองห้อง ตรวจสอบตารางเวลา และป้องกันการจองซ้ำ** ได้อย่างมีประสิทธิภาพ  

ระบบนี้สามารถนำไปใช้ได้กับ:
- 🎶 โรงเรียนสอนดนตรี / มหาวิทยาลัย  
- 🏫 สถาบันการศึกษา  
- 🎤 สตูดิโอซ้อมดนตรีส่วนตัว  

---

## 🚀 ฟีเจอร์หลัก (Features)
- ✅ **ระบบล็อกอิน / สมัครสมาชิก** (นักศึกษาหรือลูกค้า / อาจารย์หรือเจ้าของร้าน / แอดมิน)  
- ✅ **ตรวจสอบห้องว่างแบบเรียลไทม์** – ป้องกันการจองซ้ำ  
- ✅ **จัดการการจอง** – จอง, ยกเลิก, แก้ไข  
- ✅ **แดชบอร์ดผู้ดูแลระบบ (Admin Dashboard)** – จัดการผู้ใช้และตาราง  
- ✅ **ประวัติการจองและสถิติการใช้งานห้องซ้อมดนตรี**

---

## 🎨 การออกแบบ UI
- โทนสีหลัก: **ฟ้า (Turquoise)** + **เขียวอ่อน (Light Green)**  
- พื้นหลัง: สีเขียวอ่อน-ขาว ดูสะอาด สดใส  
- ปุ่ม: สีฟ้าเทอร์ควอยซ์ โค้งมน  
- ฟอนต์: เรียบ อ่านง่าย เหมาะกับทุกอุปกรณ์  
- Layout ถูกออกแบบให้ **ใช้งานง่ายและ Responsive** บนทุกหน้าจอ

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

| ส่วน | เทคโนโลยี |
|------|-------------|
| **Frontend (UI)** | HTML, CSS, JavaScript |
| **Backend (API)** | Node.js (Express.js) |
| **Database** | MongoDB (ผ่าน MongoDB Atlas) |
| **Authentication** | JWT (JSON Web Token) |
| **Deployment** | Localhost / สามารถปรับใช้บน Render, Vercel, หรือ Railway |

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)
```bash
Music-practice-room-booking-system/
│
├── backend/
│ ├── server.js # ไฟล์เริ่มต้นของเซิร์ฟเวอร์
│ ├── config/
│ │ └── db.js # การเชื่อมต่อ MongoDB
│ ├── models/
│ │ └── Booking.js # โครงสร้างข้อมูลการจอง
│ ├── routes/
│ │ └── bookingRoutes.js # เส้นทาง API (Bookings)
│ └── package.json
│
├── frontend/
│ ├── index.html # หน้าเว็บหลัก
│ ├── style.css # การตกแต่ง UI
│ └── script.js # Logic ของฝั่งผู้ใช้ (เชื่อมต่อ API)
│
└── README.md
```
---

## ⚡ วิธีติดตั้งและใช้งาน (Installation & Setup)

 **1️⃣ โคลนโปรเจกต์จาก GitHub**
   
   ```bash
   git clone https://github.com/Kittinan-Dev/Music-practice-room-booking-system.git
   cd Music-practice-room-booking-system
   ```

 **2️⃣ ติดตั้ง Dependencies (ฝั่ง Backend)**
   ```bash
   cd backend
   npm install
   ```

 **3️⃣ ตั้งค่าการเชื่อมต่อฐานข้อมูล**
 
 สร้างไฟล์ .env หรือแก้ไข config/db.js
 ตัวอย่าง .env:

 ```ini
 PORT=5000
 MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/music_room_booking?retryWrites=true&w=majority
 JWT_SECRET=your-secret-key
 ```
 
 **💡 หากรหัสผ่านมีอักขระพิเศษ เช่น @ หรือ ! ให้ใช้การเข้ารหัส URL (%40, %21)**

 **4️⃣ รัน Backend Server**
 ```bash
 npm start
 ```
 จะเห็นข้อความ:✅ MongoDB Connected
 🚀 Server running on port 5000

 **5️⃣ เปิด Frontend**
 เปิดโฟลเดอร์ frontend/index.html ด้วย Live Server
 หรือเปิดด้วยเบราว์เซอร์โดยตรง:http://127.0.0.1:5500/frontend/index.html
 
 ## 📡 API Endpoints

 | Method |	Endpoint | Description |
 |--------|----------|-------------|
 **GET** | **/api/bookings**	| **ดึงข้อมูลการจองทั้งหมด**|
 **GET**	|**/api/bookings/check?date=YYYY-MM-DD**	|**ตรวจสอบห้องที่ถูกจองในวันนั้น**|
 **POST**	|**/api/bookings**|**เพิ่มการจองใหม่**|
 **DELETE**	|**/api/bookings/:id**	|**ยกเลิกการจอง**|

 ## ตัวอย่าง JSON (POST /api/bookings):
 ```json
 {
  "name": "Kittinan Siriya",
  "phone": "0999999999",
  "room": "ห้องซ้อมดนตรี",
  "date": "2025-10-05",
  "startTime": "14:00",
  "endTime": "16:00"
}
 ```

## 🧠 ฟังก์ชันการทำงานของระบบ

| ฟังก์ชัน |	รายละเอียด |
|------- |------------|
**🏠 หน้าแรก** |	**แสดงหัวข้อ “ระบบจองห้องซ้อมดนตรี” และปฏิทินเลือกวัน|**
**📅 เลือกวัน/เวลา** |	**กำหนดช่วงเวลาซ้อม และตรวจสอบสถานะห้อง**|
**🏢 ห้องซ้อมดนตรี** |	**แสดงสถานะ “✅ ว่าง” หรือ “❌ จองแล้ว”**|
**📝 จองห้อง** |	**กรอกข้อมูล (ชื่อ, เบอร์โทร, เวลา) แล้วบันทึกลง MongoDB**|
**📋 รายการของฉัน** |	**แสดงรายการจอง พร้อมปุ่ม “ยกเลิก”**|
**📊 สถิติการใช้งาน**	| **(อยู่ระหว่างพัฒนา) แสดงจำนวนการจองและช่วงเวลายอดนิยม**|

---

**🤝 การมีส่วนร่วม (Contributing)**

สามารถส่ง Pull Request ได้ตลอด!
หากต้องการแก้ไขใหญ่ แนะนำให้เปิด Issue เพื่อพูดคุยก่อน

**ขั้นตอนการร่วมพัฒนา**
```bash
# 1. Fork โปรเจกต์
# 2. สร้าง Branch ใหม่
git checkout -b feature/new-feature
# 3. Commit การเปลี่ยนแปลง
git commit -m "เพิ่มฟีเจอร์ใหม่"
# 4. Push ไปที่ Branch ของคุณ
git push origin feature/new-feature
# 5. เปิด Pull Request
```

**👨‍💻 ผู้พัฒนา (Developer)**

Kittinan Siriya
📧 Email: kittinan.work05@gmail.com
🌐 GitHub: Kittinan-Dev

📜 License

โปรเจกต์นี้เผยแพร่ภายใต้ MIT License
