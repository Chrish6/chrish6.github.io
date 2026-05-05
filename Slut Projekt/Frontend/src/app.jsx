ReactDOM.createRoot(document.querySelector("#app")).render(<App />);

// ===================== ROUTER =====================

function navigate(path) {
  window.location.hash = path;
}

function getRoute() {
  const hash = window.location.hash.replace("#", "");
  return hash || "hem";
}

// ===================== APP =====================

function App() {
  const [route, setRoute] = React.useState(getRoute());

  React.useEffect(() => {
    const handleHash = () => setRoute(getRoute());

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="app">
      {route === "hem" ? <Hem /> : ""}
      {route === "reservdelar" ? <Reservdelar /> : ""}
      {route === "lackering" ? <Lackering /> : ""}
      {route === "karosseri" ? <Karosseri /> : ""}
      {route === "polering" ? <Polering /> : ""}
      {route === "verktyg" ? <Verktyg /> : ""}
      {route === "varumarken" ? <Varumarken /> : ""}
      {route === "om-oss" ? <OmOss /> : ""}
      {route === "kontakt" ? <Kontakt /> : ""}
    </div>
  );
}

function Hem() {
  return (
    <div className="hem">
      <h1>Välkommen till vår webbplats</h1>
      <p>Välj en kategori för att se våra produkter:</p>
    </div>
  );
}
function Reservdelar() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    GetProducts();
  }, []);
  async function GetProducts() {
    const res = await fetch("./Data/products.json");
    const data = await res.json();
    setProducts(data);
  }
  return (
    <div className="reservdelar">
      <h2>Reservdelar</h2>
      <div className="cards">
        {products.map((prod) => (
          <Prod key={prod.artikelnummer} prod={prod} />
        ))}
      </div>
    </div>
  );
}

function Prod({ prod }) {
  const [more, setMore] = React.useState(false);
  function showMore(ev) {
    setMore((prev) => true);

    document.querySelector("html").style.scrollBehavior = "unset";
    window.scrollTo(0, 0);
  }

  function closeMore(ev) {
    ev.stopPropagation();
    setMore((prev) => false);
  }
  const imgPrefix = "./Frontend/IMG/";
  return (
    <>
      <div className="card" onClick={showMore}>
        <div className="imgbox">
          <img src={imgPrefix + prod.bilder} alt={prod.namn} />
        </div>
        <p className="artikelnummer">Art.nr: {prod.artikelnummer}</p>
        <h3>{prod.namn}</h3>
        <p className="beskrivning">{prod.beskrivning}</p>
        <p className="lager">Antal i lager: {prod.lager.antal} st</p>
        <p className="pris">{prod.pris} kr</p>
        <button onClick={showMore}>KÖP</button>
      </div>
      {more ? (
        <ShowMoreComp prod={prod} closeMore={closeMore}></ShowMoreComp>
      ) : (
        ""
      )}
    </>
  );
}

function ShowMoreComp({ prod, closeMore }) {
  const imgPrefix = "./Frontend/IMG/";

  return (
    <div className="more">
      <div className="top">
        <button className="tillbaka" onClick={closeMore}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <p className="kategorier">
          {prod.kategori} / {prod.underkategori}
        </p>
      </div>

      <div className="middle">
        {/* Bild */}
        <div className="imgbox">
          <img src={imgPrefix + prod.bilder} alt={prod.namn} />
        </div>

        {/* Huvud-info */}
        <div className="sideoptions">
          <h2>{prod.namn}</h2>
          <h4>{prod.artikelnummer}</h4>
          <p>{prod.beskrivning}</p>
          <span className="pris">{prod.pris} kr</span>
          <button>Köp</button>
        </div>
      </div>
      {/* Kompatibilitet */}
      <div className="kompatibilitet">
        <h3>Passar följande bilar</h3>
        {prod.kompatibilitet.map((k, i) => (
          <p key={i}>
            {k.marke} {k.modell} — {k.ar_fran} till {k.ar_till}
          </p>
        ))}
      </div>

      {/* Alternativa artikelnummer */}
      <div className="alt-artikelnummer">
        <h3>Alternativa artikelnummer</h3>
        {prod.alternativa_artikelnummer.map((a, i) => (
          <span key={i}>{a}</span>
        ))}
      </div>

      {/* Lagerstatus */}
      <div className="lager">
        <h3>Lagerstatus</h3>
        <p>Antal i lager: {prod.lager.antal}</p>
        <p>Plats: {prod.lager.plats}</p>
      </div>

      {/* Skick */}
      <div className="skick">
        <h3>Skick</h3>
        <p>{prod.skick.skadad ? "Skadad" : "Oskadad"}</p>
        {prod.skick.skadebeskrivning && <p>{prod.skick.skadebeskrivning}</p>}
      </div>
    </div>
  );
}
function Lackering() {
  return <h2>Lackering</h2>;
}
function Karosseri() {
  return <h2>Karosseri</h2>;
}
function Polering() {
  return <h2>Polering</h2>;
}
function Verktyg() {
  return <h2>Verktyg</h2>;
}
function Varumarken() {
  return <h2>Varumärken</h2>;
}
function OmOss() {
  return <h2>Om oss</h2>;
}
function Kontakt() {
  return <h2>Kontakta oss</h2>;
}
