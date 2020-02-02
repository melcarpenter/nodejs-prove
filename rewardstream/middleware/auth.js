const crypto = require('crypto');
const models = require('../models');
const logger = require('../modules/logger');

// Verify if user logged in
function verifyUser(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.companyId) {
      return models.company.findOne({
        where: {
          id: {
            $eq: req.user.companyId
          }
        }
      })
        .then((company) => {
          req.company = company || null;
          next();
        })
        .catch((err) => next()); //eslint-disable-line
    }
    logger.info('verifyUser');
    return next();
  }
  return res.status(401).send({ result: 'error', message: 'Unauthorized user' });
}

// Verify if user logged in and has company
function verifyUserCompany(req, res, next) {
  verifyUser(req, res, () => {
    if (req.company) return next();
    return res.status(400).send({ result: 'error', message: 'User has no company' });
  });
}

// Verify if user logged in and has no company
function verifyUserNoCompany(req, res, next) {
  verifyUser(req, res, () => {
    if (req.company) return res.status(400).send({ result: 'error', message: 'Already owned company' });
    return next();
  });
}

// check signature
function checkSignature(apiKey, payload, signature, cb) {
  models.company.findOne({
    where: {
      apiKey: {
        $eq: apiKey
      }
    }
  })
    .then((company) => {
      if (!company) {
        return cb({ message: 'Api key is not existing' }, null);
      }

      const hmac = crypto.createHmac('sha256', company.apiSecret);
      hmac.update(JSON.stringify(payload));
      const signed = hmac.digest('hex');
      logger.info(`signed : ${signed}`);

      if (signature !== signed) {
        return cb({ message: 'Invalid signature' }, null);
      }

      return cb(null, company);
    })
    .catch((err) => cb({ message: 'Company not found' }, null)); // eslint-disable-line
}

// Verify if api key is valid and signature is correct
function verifyApiKey(req, res, next) {
  let payload = null;
  if (req.method === 'POST') {
    payload = req.body;
  } else if (req.method === 'GET') {
    payload = req.query;
  }
  logger.info(`headers: ${JSON.stringify(req.headers.signature)}`);
  if (!req.headers.apikey) {
    return res.status(400).send({ result: 'error', message: 'Missing apiKey' });
  }

  if (!req.headers.signature) {
    return res.status(400).send({ result: 'error', message: 'Missing signature' });
  }

  return checkSignature(req.headers.apikey, payload, req.headers.signature, (err, company) => {
    if (err) return res.status(400).send({ result: 'error', message: err.message });

    req.company = company;
    return next();
  });
}

// Verify if user has company or apikey is correct
function verifyCompany(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.companyId) {
      return models.company.findOne({
        where: {
          id: {
            $eq: req.user.companyId
          }
        }
      })
        .then((company) => {
          if (company) {
            req.company = company;
            return next();
          }
          return verifyApiKey(req, res, next);
        })
        .catch((err) => verifyApiKey(req, res, next)); //eslint-disable-line
    }
    return verifyApiKey(req, res, next);
  }
  return verifyApiKey(req, res, next);
}

module.exports = {
  verifyUser,
  verifyApiKey,
  verifyUserCompany,
  verifyUserNoCompany,
  verifyCompany
};
