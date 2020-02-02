const config = require('../config');
const sendgridMail = require('@sendgrid/mail');
sendgridMail.setApiKey(config.email.sendgrid.apiKey);
module.exports = sendgridMail;
