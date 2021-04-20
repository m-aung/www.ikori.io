const message = require('../models/MessageModel');
module.exports = {
  // star
  // posting message
  postMessage(req, res, next) {
    message
      .create({
        message: req.body.message,
        password: req.body.password,
      })
      .then((stuff) => {
        return next();
      })
      .catch((err) => console.log('postMessage controller:', err));
  },
  // getting messages
  getMessages(req, res, next) {
    message
      .find({})
      .then((data) => {
        console.log(data);
        res.locals = data;
        next();
      })
      .catch((err) => console.log('getMessage controller:', err));
  },
  // deleting message
  deleteMessage(req, res) {
    message
      .deleteOne({
        id: req.params.id,
      })
      .then((data) => {
        console.log('deleted', data);
      })
      .catch((err) => console.log('deletemessage Controller:', err));
  },
};
