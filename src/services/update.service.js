const { Update } = require('../models');

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryLastUpdate = async () => {
  const update = await Update.findOne().sort({ updatetime: -1 });
  return update;
};

module.exports = {
  queryLastUpdate,
};
