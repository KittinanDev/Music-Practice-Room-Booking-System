exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "ต้องเป็นผู้ดูแลระบบเท่านั้น" });
  next();
};
