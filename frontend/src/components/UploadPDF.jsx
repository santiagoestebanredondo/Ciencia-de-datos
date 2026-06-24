import { useState } from "react";
import axios from "axios";

function UploadPDF({ onDataLoaded }) {

  const [file, setFile] = useState(null);

  const upload = async () => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:5000/upload-pdf",
      formData
    );
    onDataLoaded(response.data);
    console.log(response.data);
  };

  return (
    <div>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button onClick={upload}>
        Procesar PDF
      </button>

    </div>
  );
}

export default UploadPDF;