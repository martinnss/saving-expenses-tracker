import React, { useState } from 'react';

const FileInput = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  return (
    <input
      type="file"
      className="file-input"
      accept=".pdf"
      onChange={handleFileChange}
    />
  );
};

export default FileInput;
