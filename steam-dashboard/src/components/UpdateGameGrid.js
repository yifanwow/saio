import React, { useState } from 'react';

function UpdateGameGrid({ appId }) {
  const [newGridUrl, setNewGridUrl] = useState('');

  const onUpdateGrid = (appid, newGridUrl) => {
    fetch('/api/update-grid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appid, newGridUrl })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Grid URL updated successfully.');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to update grid URL.');
    });
  };

  return (
    <div>
      <input
        type="text"
        value={newGridUrl}
        onChange={e => setNewGridUrl(e.target.value)}
        placeholder="Enter new grid URL"
      />
      <button onClick={() => onUpdateGrid(appId, newGridUrl)}>
        Update Grid
      </button>
    </div>
  );
}

export default UpdateGameGrid;
