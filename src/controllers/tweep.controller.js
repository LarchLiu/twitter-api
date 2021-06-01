const { Octokit } = require('@octokit/core');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { tweepService, userService } = require('../services');
const { roleRights } = require('../config/roles');

const ghApi = new Octokit({
  auth: process.env.GITHUB_REPO_TOKEN,
});

const getTweeps = catchAsync(async (req, res) => {
  let result;
  const { role } = req.user;
  if (roleRights.get(role).tweepsType === 'random') {
    result = await tweepService.getLastTweeps(roleRights.get(role).tweepsCount);
  } else {
    const filter = { 'userinfo.username': { $in: req.user.tweeps } };
    result = await tweepService.getTweepsByUserName(filter);
  }
  res.send(result);
});

const addTweeps = catchAsync(async (req, res) => {
  const { id, tweeps, role } = req.user;
  const add = req.body.client_payload.users.split(',');
  const filter = { 'userinfo.username': { $in: add } };
  const result = await tweepService.getTweepsByUserName(filter);
  const max = roleRights.get(role).tweepsCount;
  let flag = false;

  for (let i = 0; i < result.length; i += 1) {
    const idx = add.indexOf(result[i].userinfo.username);
    add.splice(idx, 1);
    if (tweeps.length < max || max < 0) {
      tweeps.push(result[i].userinfo.username);
    } else {
      flag = true;
      break;
    }
  }
  await userService.updateUserById(id, { tweeps });

  if (add.length > 0 && !flag && (add.length + tweeps.length <= max || max < 0)) {
    await ghApi.request(`POST ${process.env.GITHUB_REPO_URL}`, {
      event_type: req.body.event_type,
      client_payload: {
        users: add.join(','),
      },
    });
    res.send('wait');
  } else {
    if (add.length === 0) {
      return res.send('success');
    }
    throw new ApiError(httpStatus.FORBIDDEN, `Greater than custom number of tweeps: ${max}`);
  }
});

const delTweeps = catchAsync(async (req, res) => {
  const { id, tweeps } = req.user;
  const del = req.body.client_payload.users.split(',');
  for (let i = 0; i < del.length; i += 1) {
    const idx = tweeps.indexOf(del[i]);
    tweeps.splice(idx, 1);
  }
  await userService.updateUserById(id, { tweeps });
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getTweeps,
  addTweeps,
  delTweeps,
};
