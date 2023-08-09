const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  title: String,
  text: String,
  result: String,
  category: String,
  tag: String,
  notes: String
});

promptSchema.methods.removePrompt = async function () {
  await this.remove();
};

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
