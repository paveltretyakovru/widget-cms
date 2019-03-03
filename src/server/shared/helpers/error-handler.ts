export function errorHandler(err, req, res, next) {
  // some application error
  if (typeof (err) === 'string') {
    return res.status(400).json({success: false, message: err });
  }

  // jwt error
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({success: false, message: 'Invalid Token' });
  }

  // 500 error default
  return res.status(500).json({success: false, message: err.message });
}
