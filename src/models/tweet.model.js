/* eslint-disable func-names */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
require('mongoose-long')(mongoose);

const {
  Types: { Long },
} = mongoose;

const tweetSchema = new mongoose.Schema({
  hashtags: [String],
  html: String,
  id: String,
  isquoted: Boolean,
  ispin: Boolean,
  isreply: Boolean,
  isretweet: Boolean,
  likes: Long,
  permanenturl: String,
  photos: [String],
  replies: Long,
  retweets: Long,
  text: String,
  timeparsed: Date,
  timestamp: Long,
  urls: [String],
  userid: String,
  username: String,
  videos: [
    {
      id: String,
      preview: String,
      url: String,
    },
  ],
});

tweetSchema.plugin(toJSON);
tweetSchema.plugin(paginate);

/**
 * @typedef Tweet
 */
const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;
