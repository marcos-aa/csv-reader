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
        <div className="info-card" data-testid="info-card"></div>
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
