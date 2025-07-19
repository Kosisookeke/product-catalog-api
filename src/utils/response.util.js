exports.sendSuccess = (res, status, data) => {
  res.status(status).json({ success: true, data });
};

exports.sendError = (res, status, message) => {
  res.status(status).json({ success: false, error: message });
};