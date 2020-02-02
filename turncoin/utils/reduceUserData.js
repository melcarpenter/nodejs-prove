const _ = require('lodash');

module.exports = function reduceUserData(userDetails) {
  return {
    ..._.pick(userDetails, ['id', 'firstName', 'lastName', 'email', 'username', 'phone', 'emailConfirmed',
      'verified', 'kycStatus', 'kycUrl', 'kycId', 'documentStatus', 'documentId', 'documentUrl'])
  };
};
