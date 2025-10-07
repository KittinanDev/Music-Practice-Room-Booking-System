const User = require("../models/User");
const jwt = require("jsonwebtoken");

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ✅ สมัครสมาชิก
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "กรอกข้อมูลให้ครบ" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "อีเมลนี้ถูกใช้แล้ว" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
      message: "สมัครสมาชิกสำเร็จ",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: genToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบสมัครสมาชิก" });
  }
};

// ✅ เข้าสู่ระบบ
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }

  res.json({
    message: "เข้าสู่ระบบสำเร็จ",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token: genToken(user._id),
  });
};
