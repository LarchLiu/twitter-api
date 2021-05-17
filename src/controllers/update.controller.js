const { Octokit } = require('@octokit/core');
const catchAsync = require('../utils/catchAsync');
const { updateService } = require('../services');

const ghApi = new Octokit({
  auth: process.env.GITHUB_REPO_TOKEN,
});
const getUpdate = catchAsync(async (req, res) => {
  const result = await updateService.queryLastUpdate();
  res.send(result);
});

const pushUpdate = catchAsync(async (req, res) => {
  await ghApi.request(`POST ${process.env.GITHUB_REPO_URL}`, {
    event_type: req.body.event_type,
  });
  res.send('wait');
});

module.exports = {
  getUpdate,
  pushUpdate,
};
