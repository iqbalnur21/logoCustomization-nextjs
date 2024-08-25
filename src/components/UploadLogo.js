import React from "react";

const UploadLogo = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".ai,.svg,.png" />
    </div>
  );
};

export default UploadLogo;
