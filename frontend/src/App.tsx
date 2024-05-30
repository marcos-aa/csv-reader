import { faBasketball, faUser } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
function App() {
  return (
    <main>
      <div id="actionables">
        <input name="search" type="text" value={""} placeholder="Search" />
        <label>
          <input type="file" />
          Upload
        </label>
      </div>

      <section id={"cards-holder"}>
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
