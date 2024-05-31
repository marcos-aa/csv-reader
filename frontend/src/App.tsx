import {
  faBasketball,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSVRow } from "@shared/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import "./App.css";

const baseURL = "http://localhost:3000";
function App() {
  const [, setUsers] = useState<CSVRow[]>([]);
  const [search, setSearch] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
    const newfile = e.currentTarget.files?.item(0);
    setFile(() => newfile ?? null);
  };

  const handleFileRemoval = () => setFile(null);

  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    await fetch(baseURL + "/api/files", {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });
  };

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getUsers = async (search: string) => {
    const res = await fetch(`${baseURL}/api/users?q=${search}`);
    const data: CSVRow[] = (await res.json()).data;
    setUsers(data);
  };

  useEffect(() => {
    if (search.length < 1) return;

    const timeoutID = setTimeout(() => {
      getUsers(search);
    }, 400);

    return () => clearTimeout(timeoutID);
  }, [search]);

  return (
    <main>
      <div id="actionables">
        <input
          name="search"
          type="text"
          value={search}
          placeholder="Search"
          onChange={handleSearch}
        />
        <label className="upload-label">
          <input type="file" accept="text/csv" onChange={handleFileChange} />
          Upload
        </label>

        <form
          id="file-actions"
          className={file ? "shared-wd" : "full-wd"}
          onSubmit={handleFileSubmit}
        >
          <button
            className="file-action"
            type="button"
            id="eject-file"
            title="Remove CSV file"
            onClick={handleFileRemoval}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <button className="file-action" type="submit" title="Submit CSV file">
            <FontAwesomeIcon icon={faUpload} />
          </button>
        </form>
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
