const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
require('mongoose-long')(mongoose);

const {
  Types: { Long },
} = mongoose;

const tweepSchema = new mongoose.Schema(
  {
    userinfo: {
      avatar: String,
      username: String,
      name: String,
      lasttweettime: Long,
      lastupdatetime: Long,
      tweetscount: Long,
    },
    profile: {
      avatar: String,
      banner: String,
      biography: String,
      birthday: String,
      followerscount: Long,
      followingcount: Long,
      friendscount: Long,
      isprivate: Boolean,
      isverified: Boolean,
      joined: Date,
      likescount: Long,
      listedcount: Long,
      location: String,
      name: String,
      pinnedtweetids: [String],
      tweetscount: Long,
      url: String,
      userid: String,
      username: String,
      website: String,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
tweepSchema.plugin(toJSON);
tweepSchema.plugin(paginate);

/**
 * @typedef Tweep
 */
const Tweep = mongoose.model('tweeps', tweepSchema);

module.exports = Tweep;
