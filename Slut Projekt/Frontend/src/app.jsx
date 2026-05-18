ReactDOM.createRoot(document.querySelector("#app")).render(<App />);

function getRoute() {
  const hash = window.location.hash.replace("#", "");
  return hash || "hem";
}

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
      <div className="hero">
        <h1>Halmstads bästa <span>bildelar</span></h1>
        <p>Reservdelar, lackering, karosseri och mer – allt på ett ställe sedan 2005.</p>
        <div className="hero-btns">
          <a href="#reservdelar" className="btn-primary">Handla reservdelar</a>
          <a href="#om-oss" className="btn-secondary">Om oss</a>
        </div>
      </div>

      <div className="usp-belt">
        <div className="usp-item">
          <i className="fa-solid fa-truck-fast"></i>
          <div>
            <p>Snabb leverans</p>
            <span>Fri frakt över 500 kr</span>
          </div>
        </div>
        <div className="usp-item">
          <i className="fa-solid fa-shield-halved"></i>
          <div>
            <p>2 års garanti</p>
            <span>På alla produkter</span>
          </div>
        </div>
        <div className="usp-item">
          <i className="fa-solid fa-rotate-left"></i>
          <div>
            <p>30 dagars retur</p>
            <span>Enkel returprocess</span>
          </div>
        </div>
        <div className="usp-item">
          <i className="fa-solid fa-headset"></i>
          <div>
            <p>Teknisk support</p>
            <span>Mån–fre 08–17</span>
          </div>
        </div>
      </div>

      <div className="hem-kategorier">
        <h2>Vad letar du efter?</h2>
        <p className="subtitle">Välj kategori för att komma igång</p>
        <div className="kat-grid">
          <a href="#reservdelar" className="kat-card">
            <div className="kat-icon"><i className="fa-solid fa-car-side"></i></div>
            <h3>Reservdelar</h3>
            <p>Motor, bromsar, fjädring och mer</p>
          </a>
          <a href="#lackering" className="kat-card">
            <div className="kat-icon"><i className="fa-solid fa-spray-can-sparkles"></i></div>
            <h3>Lackering</h3>
            <p>Professionell lack och finish</p>
          </a>
          <a href="#karosseri" className="kat-card">
            <div className="kat-icon"><i className="fa-solid fa-car-burst"></i></div>
            <h3>Karosseri</h3>
            <p>Skador, bucklor och reparationer</p>
          </a>
          <a href="#polering" className="kat-card">
            <div className="kat-icon"><i className="fa-solid fa-star"></i></div>
            <h3>Polering</h3>
            <p>Glans och skydd för lacken</p>
          </a>
          <a href="#verktyg" className="kat-card">
            <div className="kat-icon"><i className="fa-solid fa-screwdriver-wrench"></i></div>
            <h3>Verktyg</h3>
            <p>Allt för din garage och verkstad</p>
          </a>
          <a href="#varumarken" className="kat-card">
            <div className="kat-icon"><i className="fa-solid fa-tags"></i></div>
            <h3>Varumärken</h3>
            <p>Ledande märken i branschen</p>
          </a>
        </div>
      </div>

      <div className="varfor-oss">
        <h2>Varför välja Onwheels?</h2>
        <p className="subtitle">Vi har hållit på sedan 2005 – och vi gör det ordentligt</p>
        <div className="varfor-grid">
          <div className="varfor-item">
            <i className="fa-solid fa-certificate"></i>
            <h3>Certifierade delar</h3>
            <p>Alla reservdelar är kvalitetskontrollerade och certifierade.</p>
          </div>
          <div className="varfor-item">
            <i className="fa-solid fa-users"></i>
            <h3>Expert-team</h3>
            <p>Erfarna mekaniker och bilentusiaster som hjälper dig rätt.</p>
          </div>
          <div className="varfor-item">
            <i className="fa-solid fa-clock"></i>
            <h3>Snabb service</h3>
            <p>Lager i Halmstad – beställ idag, hämta imorgon.</p>
          </div>
          <div className="varfor-item">
            <i className="fa-solid fa-leaf"></i>
            <h3>Hållbart val</h3>
            <p>Vi väljer miljöcertifierade leverantörer och förpackningar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Reservdelar() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => { GetProducts(); }, []);

  async function GetProducts() {
    const res = await fetch("./Data/products.json");
    const data = await res.json();
    setProducts(data);
  }

  return (
    <div className="reservdelar">
      <div className="tjanst-hero reservdelar-hero">
        <i className="fa-solid fa-car-side"></i>
        <h1>Reservdelar</h1>
        <p>Kvalitetsdelar för alla bilmärken – direkt från lager i Halmstad.</p>
      </div>
      <div className="cards">
        {products.map(prod => (
          <Prod prod={prod} />
        ))}
      </div>
    </div>
  );
}

function Prod({ prod }) {
  const [more, setMore] = React.useState(false);

  function showMore() {
    setMore(true);
    document.querySelector("html").style.scrollBehavior = "unset";
    window.scrollTo(0, 0);
  }

  function closeMore(ev) {
    ev.stopPropagation();
    setMore(false);
  }

  const imgPrefix = "./Frontend/IMG/";

  return (
    <>
      <div className="card" data-kategori={prod.kategori} onClick={showMore}>
        <div className="imgbox">
          <img src={imgPrefix + prod.bilder} alt={prod.namn} />
        </div>
        <p className="artikelnummer">Art.nr: {prod.artikelnummer}</p>
        <h3>{prod.namn}</h3>
        <p className="beskrivning">{prod.beskrivning}</p>
        <p className="lager">Antal i lager: {prod.lager.antal} st</p>
        <p className="pris">{prod.pris} kr</p>
        <button >KÖP</button>
      </div>
      {more ? <ShowMoreComp prod={prod} closeMore={closeMore} /> : ""}
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
        <p className="kategorier">{prod.kategori} / {prod.underkategori}</p>
      </div>
      <div className="middle">
        <div className="imgbox">
          <img src={imgPrefix + prod.bilder} alt={prod.namn} />
        </div>
        <div className="sideoptions">
          <h2>{prod.namn}</h2>
          <h4>{prod.artikelnummer}</h4>
          <p>{prod.beskrivning}</p>
          <span className="pris">{prod.pris} kr</span>
          <button>Köp</button>
        </div>
      </div>
      <div className="kompatibilitet">
        <h3>Passar följande bilar</h3>
        {prod.kompatibilitet.map((k, i) => (
          <p key={i}>{k.marke} {k.modell}</p>
        ))}
      </div>
      <div className="alt-artikelnummer">
        <h3>Alternativa artikelnummer</h3>
        {prod.alternativa_artikelnummer.map((a, i) => (
          <span key={i}>{a}</span>
        ))}
      </div>
      <div className="lager">
        <h3>Lagerstatus</h3>
        <p>Antal i lager: {prod.lager.antal}</p>
        <p>Plats: {prod.lager.plats}</p>
      </div>
      <div className="skick">
        <h3>Skick</h3>
        <p>{prod.skick.skadad ? "Skadad" : "Oskadad"}</p>
        {prod.skick.skadebeskrivning && <p>{prod.skick.skadebeskrivning}</p>}
      </div>
    </div>
  );
}

function Lackering() {
  return (
    <div className="tjanst-page">
      <div className="tjanst-hero lackering">
        <i className="fa-solid fa-spray-can-sparkles"></i>
        <h1>Lackering</h1>
        <p>Professionell lackering för alla bilmodeller.</p>
        <a href="#kontakt">Boka tid</a>
      </div>
    </div>
  );
}

function Karosseri() {
  return (
    <div className="tjanst-page">
      <div className="tjanst-hero karosseri">
        <i className="fa-solid fa-car-burst"></i>
        <h1>Karosseri</h1>
        <p>Räta ut bucklor och reparera skador – utan att det syns.</p>
        <a href="#kontakt">Boka tid</a>
      </div>
    </div>
  );
}

function Polering() {
  return (
    <div className="tjanst-page">
      <div className="tjanst-hero polering">
        <i className="fa-solid fa-star"></i>
        <h1>Polering</h1>
        <p>Återställ glansen och skydda lacken mot framtida skador.</p>
        <a href="#kontakt">Boka tid</a>
      </div>
    </div>
  );
}

function Verktyg() {
  return (
    <div className="tjanst-page">
      <div className="tjanst-hero verktyg">
        <i className="fa-solid fa-screwdriver-wrench"></i>
        <h1>Verktyg</h1>
        <p>Professionella verktyg för hemmagaraget och verkstaden.</p>
        <a href="#reservdelar">Se sortiment</a>
      </div>
    </div>
  );
}

function Varumarken() {
  return (
    <div className="tjanst-page">
      <div className="tjanst-hero varumarken-hero">
        <i className="fa-solid fa-tags"></i>
        <h1>Varumärken</h1>
        <p>Vi samarbetar med branschens ledande märken.</p>
      </div>
    </div>
  );
}

function OmOss() {
  return (
    <div className="tjanst-page">
      <div className="tjanst-hero om-oss-hero">
        <i className="fa-solid fa-users"></i>
        <h1>Om oss</h1>
        <p>Onwheels grundades 2005 i Halmstad med ett enkelt mål – göra bilen enklare för alla.</p>
      </div>
    </div>
  );
}

function Kontakt() {
  return (
    <div className="tjanst-page">
      <div className="tjanst-hero kontakt-hero">
        <i className="fa-solid fa-envelope"></i>
        <h1>Kontakta oss</h1>
        <p>Vi svarar inom 24 timmar på vardagar.</p>
      </div>
    </div>
  );
}