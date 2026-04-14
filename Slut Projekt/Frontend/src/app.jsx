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
      <h1>Velkommen till vår webbplats</h1>
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
      <div className="reservdelar-lista">
        {products.map((prod) => (
          <Prod key={prod.artikelnummer} prod={prod} />
        ))}
      </div>
    </div>
  );
}

function Prod({ prod }) {
  return (
    <div className="reservdel">
      <h3>{prod.namn}</h3>
      <p>Art.nr: {prod.artikelnummer}</p>
      <p>{prod.beskrivning}</p>
      <p>
        {prod.kategori} — {prod.underkategori}
      </p>
      <p>{prod.pris} kr</p>
      <p>Antal i lager: {prod.lager.antal} st</p>
      <p>
        Plats: {prod.lager.plats} (Sektion {prod.lager.sektion}, Rad{" "}
        {prod.lager.rad}, Hylla {prod.lager.hylla})
      </p>
      <p>
        Skick:{" "}
        {prod.skick.godkand_for_forsaljning
          ? "Godkänd för försäljning"
          : "Ej godkänd för försäljning"}
      </p>
      {prod.skick.skadad && (
        <>
          <p>⚠ Skadad</p>
          {prod.skick.skadebeskrivning && (
            <p>Skadebeskrivning: {prod.skick.skadebeskrivning}</p>
          )}
          {prod.skick.skadeplats && <p>Skadeplats: {prod.skick.skadeplats}</p>}
        </>
      )}
      <p>Passar:</p>
      
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
