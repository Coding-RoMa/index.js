import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Prompt from './Prompt';
import Diary from './Diary';
import './App.css';

function App() {
  const [prompts, setPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTab, setSelectedTab] = useState('library');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [notes, setNotes] = useState('');
  const [diaryEntries, setDiaryEntries] = useState(JSON.parse(localStorage.getItem('diaryEntries')) || []);

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  useEffect(() => {
    fetch('http://localhost:3000/prompts')
      .then(response => response.json())
      .then(data => setPrompts(data));

    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      .then(data => setCategories(data));

    fetch('http://localhost:3000/tags')
      .then(response => response.json())
      .then(data => setTags(data));
  }, []);

  const addPrompt = () => {
    const newPrompt = {
      title,
      text,
      result,
      category: selectedCategory,
      tag: selectedTag,
      notes,
    };

    fetch('http://localhost:3000/prompts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPrompt),
    })
      .then(response => response.json())
      .then(data => {
        setPrompts([...prompts, data]);
        setTitle('');
        setText('');
        setResult('');
        setSelectedCategory('');
        setSelectedTag('');
        setNotes('');
      });
  };

  const deletePrompt = id => {
    fetch(`http://localhost:3000/prompts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPrompts(prompts.filter(prompt => prompt._id !== id));
      });
  };

  const addCategory = () => {
    const newCategory = { name: selectedCategory };

    fetch('http://localhost:3000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    })
      .then(response => response.json())
      .then(data => {
        setCategories([...categories, data]);
        setSelectedCategory('');
      });
  };

  const deleteCategory = id => {
    fetch(`http://localhost:3000/categories/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCategories(categories.filter(category => category._id !== id));
      });
  };

  const addTag = () => {
    const newTag = { name: selectedTag };

    fetch('http://localhost:3000/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTag),
    })
      .then(response => response.json())
      .then(data => {
        setTags([...tags, data]);
        setSelectedTag('');
      });
  };

  const deleteTag = id => {
    fetch(`http://localhost:3000/tags/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTags(tags.filter(tag => tag._id !== id));
      });
  };

  const addDiaryEntry = (entry) => {
    setDiaryEntries([...diaryEntries, entry]);
  };

  return (
    <Router>
      <div>
        <h1 className="title">Prompt Library CMS</h1>
        <div className="secondary-menu">
          <Link to="/library">Library</Link>
          <Link to="/categories">Category</Link>
          <Link to="/tags">Tag</Link>
          <Link to="/diary">Diary</Link>
        </div>
        <Routes>
          <Route path="/library" element={
            <div>
              <input type="text" className="prompt-input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
              <textarea className="prompt-input" placeholder="Text" value={text} onChange={e => setText(e.target.value)}></textarea>
              <textarea className="prompt-input" placeholder="Result" value={result} onChange={e => setResult(e.target.value)}></textarea>
              <textarea className="prompt-input" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
             

<select className="category-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select className="tag-select" value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
                <option value="">Select Tag</option>
                {tags.map(tag => (
                  <option key={tag._id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>

             

			 <button className="addprompt-button" onClick={addPrompt}>Add</button>

              {prompts.map(prompt => (
                <Prompt key={prompt._id} prompt={prompt} onDelete={deletePrompt} />
              ))}
            </div>
          }/>
          <Route path="/categories" element={
            <div>
              <h3>Categories</h3>
              <ul>
                {categories.map(category => (
                  <li key={category._id}>
                    {category.name}
                    <button onClick={() => deleteCategory(category._id)}>Delete</button>
                  </li>
                ))}
              </ul>
              <div>
                <input
                  type="text"
                  placeholder="New Category"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                />
                <button onClick={addCategory}>Add Category</button>
              </div>
            </div>
          }/>
          <Route path="/tags" element={
            <div>
              <h3>Tags</h3>
              <ul>
                {tags.map(tag => (
                  <li key={tag._id}>
                    {tag.name}
                    <button onClick={() => deleteTag(tag._id)}>Delete</button>
                  </li>
                ))}
              </ul>
              <div>
                <input
                  type="text"
                  placeholder="New Tag"
                  value={selectedTag}
                  onChange={e => setSelectedTag(e.target.value)}
                />
                <button onClick={addTag}>Add Tag</button>
              </div>
            </div>
          }/>
          <Route path="/diary" element={<Diary entries={diaryEntries} addEntry={addDiaryEntry} tags={tags} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
