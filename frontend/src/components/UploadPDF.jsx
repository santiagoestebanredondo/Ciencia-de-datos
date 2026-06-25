import { useState } from "react";
import axios from "axios";

function UploadPDF({ onDataLoaded }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const upload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "http://localhost:5000/upload-pdf",
      formData
    );
    setUploadedFile(file.name);
    setUploading(false);
    onDataLoaded(response.data, file.name);
  };

  return (
    <div>
      <div className="upload-label">Carga de Expediente</div>
      <div className="upload-row">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setUploadedFile(null);
          }}
        />
        <button className="upload-btn" onClick={upload} disabled={!file || uploading}>
          {uploading ? "Procesando..." : "Procesar PDF"}
        </button>
        {uploadedFile && (
          <span className="upload-file-info">
            <strong>{uploadedFile}</strong> cargado correctamente
          </span>
        )}
      </div>
    </div>
  );
}

export default UploadPDF;
