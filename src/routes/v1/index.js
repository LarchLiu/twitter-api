const express = require('express');
const authRoute = require('./auth.route');
const oauthRoute = require('./oauth.route');
const userRoute = require('./user.route');
const tweepRoute = require('./tweep.route');
const tweetRoute = require('./tweet.route');
const updateRoute = require('./update.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/oauth',
    route: oauthRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/tweeps',
    route: tweepRoute,
  },
  {
    path: '/tweets',
    route: tweetRoute,
  },
  {
    path: '/updates',
    route: updateRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
