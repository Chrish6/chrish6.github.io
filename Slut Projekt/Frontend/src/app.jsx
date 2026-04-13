const el = document.querySelector("#app");
ReactDOM.createRoot(el).render(<App />);

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

// ===================== PLATSHÅLLARSIDOR =====================
function Hem() {
  return (
    <div className="hem">
      <h1>Velkommen till vår webbplats</h1>
      <p>Välj en kategori för att se våra produkter:</p>
    </div>
  );
}
function Reservdelar() {
  return (
    <div className="reservdelar">
      <h2>Reservdelar</h2>
      <p>
        Här kan du se våra reservdelar. Klicka på en produkt för mer
        information.
      </p>
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




