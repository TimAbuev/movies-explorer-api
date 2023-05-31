const clearJwtCookie = (req, res, next) => {
  res.clearCookie('jwt');
  next();
};

module.exports = clearJwtCookie;
