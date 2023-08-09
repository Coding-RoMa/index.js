const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  title: String,
  text: String,
  result: String,
  category: String,
  tag: String,
  notes: String
});

const categorySchema = new mongoose.Schema({
  name: String
});

const tagSchema = new mongoose.Schema({
  name: String
});

const Prompt = mongoose.model('Prompt', promptSchema);
const Category = mongoose.model('Category', categorySchema);
const Tag = mongoose.model('Tag', tagSchema);

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv:****', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to database');
});

app.get('/prompts', async (req, res) => {
  try {
    const prompts = await Prompt.find().select('title text result category tag notes');
    res.json(prompts);
  } catch (err) {
    console.log('Error fetching prompts:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/prompts', async (req, res) => {
  const newPrompt = new Prompt(req.body);
  try {
    const savedPrompt = await newPrompt.save();
    res.json(savedPrompt);
  } catch (err) {
    console.log('Error adding prompt:', err);
    res.status(500).json({ message: err.message });
  }
});

app.delete('/prompts/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndDelete(req.params.id);
    console.log('Prompt deleted:', prompt);
    if (!prompt) {
      console.log('Prompt not found');
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.json({ message: 'Prompt deleted', prompt });
  } catch (err) {
    console.log('Error deleting prompt:', err);
    res.status(500).json({ message: err.message });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.log('Error fetching categories:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/categories', async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    console.log('Error adding category:', err);
    res.status(500).json({ message: err.message });
  }
});

app.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    console.log('Category deleted:', category);
    if (!category) {
      console.log('Category not found');
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted', category });
  } catch (err) {
    console.log('Error deleting category:', err);
    res.status(500).json({ message: err.message });
  }
});

app.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.log('Error fetching tags:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/tags', async (req, res) => {
  const newTag = new Tag(req.body);
  try {
    const savedTag = await newTag.save();
    res.json(savedTag);
  } catch (err) {
    console.log('Error adding tag:', err);
    res.status(500).json({ message: err.message });
  }
});

app.delete('/tags/:id', async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    console.log('Tag deleted:', tag);
    if (!tag) {
      console.log('Tag not found');
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted', tag });
  } catch (err) {
    console.log('Error deleting tag:', err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
