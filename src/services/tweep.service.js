const { Tweep } = require('../models');

/**
 * Get all tweeps
 * @returns {Promise<Tweep>}
 */
const getTweeps = async () => {
  return Tweep.find();
};

/**
 * Get tweeps by username
 * @param {ObjectId} username
 * @returns {Promise<Tweep>}
 */
const getTweepsByUserName = async (filters) => {
  return Tweep.find(filters);
};

/**
 * Get all tweeps
 * @returns {Promise<Tweep>}
 */
const getLastTweeps = async (num) => {
  return Tweep.find().limit(num).sort({ _id: -1 });
};

module.exports = {
  getTweeps,
  getTweepsByUserName,
  getLastTweeps,
};
