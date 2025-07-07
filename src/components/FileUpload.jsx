
import React, { useRef } from "react";

const FileUpload = ({ onFiles }) => {
  const inputRef = useRef(null);

  const handleChange = async (e) => {
    const files = Array.from(e.target.files);
    const processed = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (evt) =>
              resolve({ name: file.name, url: evt.target.result });
            reader.readAsDataURL(file);
          })
      )
    );
    onFiles(processed);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="bg-gray-200 px-3 py-1 rounded"
      >
        Upload Files
      </button>
    </>
  );
};

export default FileUpload;
