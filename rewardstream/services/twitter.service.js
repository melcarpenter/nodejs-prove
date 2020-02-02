const OAuth = require('oauth');
const { twitter } = require('../config');

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  twitter.consumerKey,
  twitter.consumerSecret,
  '1.0A',
  null,
  'HMAC-SHA1'
);

exports.postTweet = function (postBody, accessToken = twitter.accessToken, accessTokenSecret = twitter.accessTokenSecret) {
  return new Promise((resolve, reject) => {
    oauth.post('https://api.twitter.com/1.1/statuses/update.json',
      accessToken,  // oauth_token (user access token)
      accessTokenSecret,  // oauth_secret (user secret)
      postBody,  // post body
      '',  // post content type ?
      (err, data, res) => { // eslint-disable-line
        if (err) reject(err);
        else resolve(data);
      });
  });
};
