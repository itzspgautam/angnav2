const setCookie = (res, token, statusCode, user) => {
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  return res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user: user,
    token: token,
  });
};
module.exports = setCookie;
