const catchAsync = require('../utils/catchAsync');
const { tokenService } = require('../services');
const { roleRights } = require('../config/roles');

const login = catchAsync(async (req, res) => {
  const { user } = req;
  const tokens = await tokenService.generateAuthTokens(user);
  user.maxTweeps = roleRights.get(user.role).tweepsCount;
  res.redirect(`/oauth?user=${JSON.stringify(user)}&tokens=${JSON.stringify(tokens)}`);
  // res.send({ user, tokens });
});

module.exports = {
  login,
};
