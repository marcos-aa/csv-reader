import {
  faBasketball,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import "./App.css";
function App() {
  const [file, setFile] = useState<File | null>();

  const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0);
    setFile((prev) => file ?? prev);
  };

  return (
    <main>
      <div id="actionables">
        <input name="search" type="text" value={""} placeholder="Search" />
        <label>
          <input type="file" accept="text/csv" onChange={handleFileChange} />
          Upload
        </label>
        <div id="file-actions" className={file ? "shared-wd" : "full-wd"}>
          <button type="button" title="Remove CSV file" id="eject-file">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button type="submit" title="Submit CSV file">
            <FontAwesomeIcon icon={faUpload} />
          </button>
        </div>
      </div>

      <section id="cards-holder">
        <div className="info-card" data-testid="info-card">
          <div className="info-item">
            <FontAwesomeIcon icon={faUser} />
            <h1 className="info-item">John Doe</h1>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faHome} />
            <p className="info-item"> New York, USA </p>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faBasketball} />
            <p className="info-item"> Baseball </p>
          </div>
        </div>

        <div className="info-card" data-testid="info-card"></div>
        <div className="info-card" data-testid="info-card"></div>
        <div className="info-card" data-testid="info-card"></div>
        <div className="info-card" data-testid="info-card"></div>
        <div className="info-card" data-testid="info-card"></div>
        <div className="info-card" data-testid="info-card"></div>
        <div className="info-card" data-testid="info-card"></div>
      </section>
    </main>
  );
}

export default App;
