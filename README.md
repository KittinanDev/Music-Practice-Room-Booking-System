# 🎵 ระบบจองห้องซ้อมดนตรี (Music Practice Room Booking System)

![GitHub stars](https://img.shields.io/github/stars/Kittinan-Dev/Music-practice-room-booking-system?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/Kittinan-Dev/Music-practice-room-booking-system?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/Kittinan-Dev/Music-practice-room-booking-system?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge)

---

## 📌 ภาพรวม (Overview)
**Music Practice Room Booking System** คือเว็บแอปพลิเคชันที่พัฒนาขึ้นเพื่อจัดการการจองห้องซ้อมดนตรี  
ช่วยให้นักศึกษา อาจารย์ และผู้ดูแลสามารถ **จองห้อง ตรวจสอบตารางเวลา และป้องกันการจองซ้ำ** ได้อย่างมีประสิทธิภาพ  

ระบบนี้สามารถปรับใช้ได้กับ:
- 🎶 โรงเรียนสอนดนตรี / มหาวิทยาลัย  
- 🏫 สถาบันการศึกษา  
- 🎤 สตูดิโอซ้อมดนตรีส่วนตัว  

---

## 🚀 ฟีเจอร์หลัก (Features)
- ✅ **ระบบล็อกอิน / สมัครสมาชิก** (นักศึกษา / อาจารย์ / แอดมิน)  
- ✅ **ตรวจสอบห้องว่างแบบเรียลไทม์** – ป้องกันการจองซ้ำ  
- ✅ **จัดการการจอง** – จอง, ยกเลิก, แก้ไข  
- ✅ **แดชบอร์ดสำหรับผู้ดูแลระบบ (Admin Dashboard)** – จัดการผู้ใช้และตารางเวลา  
- ✅ **ประวัติการจองและการแจ้งเตือน**  

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
- **Frontend (ส่วนติดต่อผู้ใช้):** HTML, CSS, JavaScript  
- **Backend (ฝั่งเซิร์ฟเวอร์):** Node.js (Express.js)  
- **ฐานข้อมูล:** MongoDB  
- **การยืนยันตัวตน (Authentication):** JWT (JSON Web Token)  
- **การปรับใช้งาน (Deployment):** Localhost  

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)
Music-practice-room-booking-system/
│── src/
│ ├── controllers/ # ส่วนควบคุมการทำงาน
│ ├── models/ # โครงสร้างฐานข้อมูล
│ ├── routes/ # เส้นทาง API
│ ├── views/ # หน้าเว็บ (EJS / HTML)
│ └── app.js # ไฟล์หลักของเซิร์ฟเวอร์
│── public/ # ไฟล์ Static (CSS, JS, รูปภาพ)
│── config/ # ไฟล์การตั้งค่าฐานข้อมูลและระบบ
│── package.json
│── README.md

---

## ⚡ วิธีติดตั้งและใช้งาน (Installation & Setup)

1. **โคลนโปรเจกต์จาก GitHub**
   ```bash
   git clone https://github.com/Kittinan-Dev/Music-practice-room-booking-system.git
   cd Music-practice-room-booking-system

2. **ติดตั้ง Dependencies**
   ```bash
   npm install

3. **สร้างไฟล์ .env และตั้งค่าคอนฟิก**
   ##PORT=3000
   DB_URI=mongodb://localhost:27017/music_booking
   SESSION_SECRET=your-secret-key

4. **รันเซิร์ฟเวอร์**
   ```bash
   npm start

5. **เปิดเบราว์เซอร์ไปที่: http://localhost:3000**

---

## 📖ตัวอย่าง API Endpoints

GET /rooms → ดึงข้อมูลห้องที่ว่าง

POST /book → สร้างการจอง

DELETE /cancel/:id → ยกเลิกการจอง

GET /history/:userId → ดูประวัติการจองของผู้ใช้

---

## 🤝 การมีส่วนร่วม (Contributing)

สามารถส่ง Pull Request ได้ตลอด!
หากต้องการแก้ไขใหญ่ แนะนำให้เปิด Issue เพื่อพูดคุยก่อน

**ขั้นตอนการมีส่วนร่วม:**

Fork โปรเจกต์นี้

สร้าง Branch ใหม่ (git checkout -b feature/new-feature)

Commit การเปลี่ยนแปลง (git commit -m 'เพิ่มฟีเจอร์ใหม่')

Push ไปยัง Branch (git push origin feature/new-feature)

เปิด Pull Request

## 📜 ลิขสิทธิ์ (License)

โปรเจกต์นี้เผยแพร่ภายใต้ MIT License
รายละเอียดเพิ่มเติมดูได้ที่ LICENSE
