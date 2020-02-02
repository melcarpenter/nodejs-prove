// const cronSyncing = require('./cron.syncing');
const cronRewardClaim = require('./cron.reward.claim');
const cronPointsBalance = require('./cron.points.balance');
const cronCampaign = require('./cron.campaign');
const cronIntegrationResponse = require('./cron.integration.response');
const cronCoinmarketcapPrice = require('./cron.coinmarketcap.price');
const cronTransferWallet = require('./cron.transfer.wallet');

module.exports = function () {
  // cronSyncing();
  cronRewardClaim();
  cronPointsBalance();
  cronCampaign();
  cronIntegrationResponse();
  cronCoinmarketcapPrice();
  cronTransferWallet();
};
