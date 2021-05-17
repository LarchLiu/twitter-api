const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

const {
  Types: { Long },
} = mongoose;

const updateSchema = new mongoose.Schema({
  updatetime: Long,
  isupdate: Boolean,
  users: [String],
  type: String,
});

const Update = mongoose.model('updates', updateSchema);

module.exports = Update;
