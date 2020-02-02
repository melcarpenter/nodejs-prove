const { accountSid, authToken, number } = require('../config').twilio;
const client = require('twilio')(accountSid, authToken);

exports.messages = function (from, to, body) {
  if (!from) from = number;
  return new Promise((resolve, reject) => {
    client.messages
      .create({
        body,
        from,
        to
      })
      .then(message => resolve(message))
      .catch((err) => reject(err));
  });
};
