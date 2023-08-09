import React from 'react';

const Prompt = ({ prompt, onDelete }) => {
  const handleDelete = () => {
    onDelete(prompt._id);
  };

  return (
    <div>
      <h2>{prompt.title}</h2>
      <p>{prompt.text}</p>
	  <p>Result: {prompt.result}</p>
	  <p>Category: {prompt.category}</p>
	  <p>Tag: {prompt.tag}</p>
	  <p>Notes: {prompt.notes}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Prompt;
