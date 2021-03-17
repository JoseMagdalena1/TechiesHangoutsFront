import React, { useState, useRef } from "react";

export function FileUpload({ onAvatarSelected }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef();

  const handleChange = e => {
    setFiles([...Array.from(e.target.files)]);
  };

  const handleUpload = async () => {
    console.log({ files });
    if (!files) {
      return;
    }

    const data = new FormData();

    files.forEach(file => {
      data.append("file", file);
    });
    setUploading(true);

    try {
      onAvatarSelected(data);
      console.log("Upload success");
    } catch (error) {
      console.log({ error });
      console.log("Upload fail");
    } finally {
      setFiles([]);
      setUploading(false);
    }
  };

  const openFileDialog = () => {
    fileInput.current.click();
  };

  return (
    <div>
      <input
        id="chooseFile"
        ref={fileInput}
        type="file"
        accept="jpeg"
        onChange={handleChange}
      />
      <button
        className="btn"
        type="button"
        onClick={openFileDialog}
        disabled={uploading}
      >
        {uploading ? "Uploading files..." : "Choose File"}
      </button>
      <button
        className="btn"
        type="button"
        onClick={handleUpload}
        disabled={uploading}
      >
        Upload
      </button>
    </div>
  );
}
export default FileUpload;
