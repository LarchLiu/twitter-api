const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: GithubStrategy } = require('passport-github2');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

const githubOptions = {
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL,
};

const githubVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    const name = `gh${profile.username}${profile.id}`;
    const email = `${name}@tvv.com`;
    let avatar = '';
    if (profile.photos && profile.photos.length) {
      avatar = profile.photos[0].value;
    }
    const searchQuery = {
      oauthID: profile.id,
      provider: 'github',
    };

    const updates = {
      name,
      email,
      avatar,
      oauthName: profile.username,
      password: `tvv${profile.id}`,
    };

    const options = {
      returnOriginal: false,
      upsert: true,
    };

    // update the user if s/he exists or add a new user
    const user = await (await User.findOneAndUpdate(searchQuery, updates, options)).toJSON();
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const githubStrategy = new GithubStrategy(githubOptions, githubVerify);

module.exports = {
  jwtStrategy,
  githubStrategy,
};
