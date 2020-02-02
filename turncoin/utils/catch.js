const { resCodes } = require('./index');

exports.catchAndRespond = res => err => res.status(typeof err.code === 'number' ? err.code : resCodes.userError).json({
  success: false, message: err.message || 'Something went wrong'
});
exports.respondWithErr = (res, message, err) => res.status(resCodes.userError).json({
  success: false, message: err && err.data && err.data.message ? err.data.message : message || 'Something went wrong'
});
