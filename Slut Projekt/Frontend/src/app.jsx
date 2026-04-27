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
    const res = await fetch("/Slut%20Projekt/data/products.json");
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
  const imgPrefix = "./Frontend/IMG/";
  return (
    <div className="card">
      <div className="imgbox">
        <img src={imgPrefix + prod.bilder} alt={prod.namn} />
      </div>
      <div className="grid">
      <p className="artikelnummer">Art.nr: {prod.artikelnummer}</p>
      <h3>{prod.namn}</h3>
      <p className="beskrivning">{prod.beskrivning}</p>
      <p className="lager">Antal i lager: {prod.lager.antal} st</p>
      </div>
      <div className="grid">
      
      <p className="pris">{prod.pris} kr</p>
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
