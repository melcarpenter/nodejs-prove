exports.BTC_SYNCING_LASTBLOCK = 'btc-syncing-lastblock';

exports.WALLET_PROVIDER = {
  BITGO: 'bitgo',
  LOCAL: 'local',
};

exports.CURRENCY_SHORT = {
  BTC: 'BTC',
  ETH: 'ETH',
};

exports.CURRENCY_LONG = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum'
};

exports.DISTRIBUTION_STATUS = {
  VALID: 'valid',
  INVALID: 'invalid',
  EXPIRED: 'expired',
  REDEEMED: 'redeemed',
  PENDING: 'pending'
};

exports.DISTRIBUTION_METHOD = {
  USERID: 'userid',
  EMAIL: 'email',
  SMS: 'sms',
  LINK: 'link',
  TWITTER: 'twitter',
};

exports.WALLET_TYPE = {
  DEPOSIT: 'deposit',
  SENDING: 'sending',
  MASTER: 'master',
};

exports.TRANSACTION_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  TRANSFER: 'transferred',
  ERROR: 'error',
};

exports.REWARD_TYPE = {
  POINTS: 'points',
  VOUCHER: 'voucher',
  COUPON: 'coupon',
  DISCOUNT: 'discount',
  CUSTOM: 'custom'
};

// Reward campaign model
exports.CAMPAIGN_DISTRIBUTION_METHOD = {
  RAFFLE: 'raffle',
  DIRECT_PAYMENT: 'direct payment',
};

exports.CAMPAIGN_IDENTITY_TYPE = {
  USERID: 'userid',
  EMAIL: 'email',
  SMS: 'sms',
  TWITTER: 'twitter',
  CHALLENGE: 'challenge'
};

exports.CAMPAIGN_INTEGRATION_TYPE = {
  SURVEYMONKEY: 'surveymonkey',
};

exports.CAMPAIGN_PROPERTY_KEYS = {
  SURVEY_ID: 'surveyId',
  PAGE_ID: 'pageId',
  QUESTION_ID: 'questionId',
  PER_PAGE_CRON: 'perPageCron',
  PAGE_CRON: 'pageCron',
  TOTAL_CRON: 'totalCron'
};

// Company model
exports.COMPANY_PROPERTY_KEYS = {
  SURVEYMONKEY_ACCESSTOKEN: 'surveymonkey_access_token'
};

// Price model
exports.PRICE_SOURCE = {
  COINMARKETCAP: 'coinmarketcap'
};
