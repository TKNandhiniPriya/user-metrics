const verifyValidParams = (req, res, next) => {
  if (!req.query.email || !req.query.email.length) {
    return res
      .status(400)
      .json("please send a valid email as a query parameter");
  }

  if (!req.query.months || !req.query.months.length) {
    return res
      .status(400)
      .json("please send valid numbers relating seperated by comma Eg: 1,2,3");
  }

  if (req.query.months) {
    req.months = req.query.months.split(",");
  }
  req.email = req.query.email;

  next();
};

module.exports = { verifyValidParams };
