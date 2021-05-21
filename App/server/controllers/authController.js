module.exports = {
  cookieChecker(req, res, next) {
    res.cookiesChecker('pass', req.body.password);
    console.log(res.cookies);
    next();
  },
};
