// const querystring = require('querystring');
const moment = require('moment');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const models = require('../models');
const logger = require('../modules/logger');

exports.generateHash = (pwd) => (bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null));

exports.getMissingFields = (data, fields) => {
  const keys = _.keys(data);
  return _.difference(fields, keys);
};

exports.validateEmail = email => {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

exports.getPageParams = (data) => {
  const defaultPage = 1;
  const defaultPerPage = 10;
  let page = Number(data.page);
  let perPage = Number(data.perPage);

  if (isNaN(page)) page = defaultPage;
  if (isNaN(perPage)) perPage = defaultPerPage;

  page = Math.max(page, defaultPage);
  perPage = Math.min(perPage, defaultPerPage);

  return { page, perPage };
};

exports.isOutOfSyncing = (updatedAt) => {
  const expire = moment(updatedAt, 'YYYY-MM-DD HH:mm:ss').add(config.CRON_SYNCING_MINUTES, 'minutes');
  return moment().isAfter(expire);
};

exports.reducedErrorMessage = function (errorDetails) {
  if (errorDetails.errors && errorDetails.errors.length > 0) {
    return _.get(errorDetails, 'errors[0].message', 'We have some technical difficulties. Please try again.');
  }
  return _.get(errorDetails, 'message', 'We have some technical difficulties. Please try again.');
};

exports.getIp = function (req) {
  const ip = (req.headers['x-forwarded-for'] || '').split(',').pop()
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || req.connection.socket.remoteAddress;
  return ip;
};

exports.errorResponse = (res, message) => {
  logger.error(`Error: ${message}`);
  return res.status(400).json({ result: 'error', message });
};

exports.getVerifyEmailLink = (claimCode) => { // eslint-disable-line
  // const query = querystring.stringify({ claimCode });
  return `${config.EMAIL_VERIFICATION_URL}/${claimCode}`;
};

exports.validateClaimCode = claimCode => new Promise(async (resolve, reject) => {
  try {
    let isUsed = false;
    const distribution = await models.distribution.findOne(
      {
        where: {
          claimCode,
          claimed: false,
          claimDate: {
            $gt: models.sequelize.col('start'),
            $lt: models.sequelize.col('end')
          }
        }
      }
    );
    logger.info(`validateClaimCode: ${distribution}`);
    if (distribution) isUsed = true;
    resolve(isUsed);
  } catch (error) {
    logger.error(`Error in validateClaimCode: ${error}`);
    reject(error);
  }
});

exports.randomString = (length) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

exports.detectWhitelistedEmail = (email) => new Promise(async (resolve, reject) => {
  try {
    const whitelistedEmail = await models.whitelisted_email.findOne({
      where: {
        email
      }
    });
    resolve(whitelistedEmail);
  } catch (error) {
    logger.error(`Error in isWhitelistedEmail: ${error}`);
    reject(error);
  }
});
