// UpdateGameGrid.js
import React, { useState } from 'react';

function UpdateGameGrid({ appId, onSubmit }) {
  const [newGridUrl, setNewGridUrl] = useState('');

  return (
    <div>
      <input
        type="text"
        value={newGridUrl}
        onChange={e => setNewGridUrl(e.target.value)}
        placeholder="Enter new grid URL"
      />
      <button onClick={() => onSubmit(appId, newGridUrl)}>
        Update Grid
      </button>
    </div>
  );
}

export default UpdateGameGrid;
