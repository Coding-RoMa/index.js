import React, { useState } from 'react';

function Diary({ entries, addEntry, deleteEntry, tags }) {
  const [newEntry, setNewEntry] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const submitEntry = () => {
  const entry = { text: newEntry, date: new Date().toISOString(), tag: selectedTag };
  addEntry(entry);
  setNewEntry('');
  setSelectedTag('');
};


  return (
    <div>
      <h3>Diary</h3>
      {entries.map((entry, index) => (
        <div key={index}>
          <h4>{entry.date ? new Date(entry.date).toLocaleDateString() : ''}</h4>

          <p>{entry.text}</p>
          <p>Tag: {entry.tag}</p>
          <button onClick={() => deleteEntry(index)}>Delete</button>
        </div>
      ))}
      <textarea value={newEntry} onChange={e => setNewEntry(e.target.value)} placeholder="New diary entry..." />
      <select value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
        <option value="">Select Tag</option>
        {tags.map(tag => (
          <option key={tag._id} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </select>
      <button onClick={submitEntry}>Add entry</button>
    </div>
  );
}

export default Diary;
