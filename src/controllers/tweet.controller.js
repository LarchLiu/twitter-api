const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { tweetService } = require('../services');

const getTweets = catchAsync(async (req, res) => {
  const usernames = req.query.username.split(',');
  const filter = { username: { $in: usernames } };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await tweetService.queryTweets(filter, options);
  res.send(result);
});

module.exports = {
  getTweets,
};
