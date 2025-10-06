// middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error caught by middleware:", err.stack || err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "เกิดข้อผิดพลาดในระบบ",
  });
};

module.exports = { errorHandler };
