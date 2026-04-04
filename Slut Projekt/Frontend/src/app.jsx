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
  const [valdProdukt, setValdProdukt] = React.useState(null);

  React.useEffect(() => {
    const handleHash = () => setRoute(getRoute());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const produktId = route.startsWith("produkt-") ? route.replace("produkt-", "") : null;

  function oppnaProdukt(p) {
    setValdProdukt(p);
    window.location.hash = "produkt-" + p.id;
  }

  return (
    <div className="app">
      {route === "hem"         ? <Hem oppnaProdukt={oppnaProdukt} />                       : ""}
      {route === "reservdelar" ? <Products onValjProdukt={oppnaProdukt} />                 : ""}
      {route === "lackering"   ? <Lackering />                                             : ""}
      {route === "karosseri"   ? <Karosseri />                                             : ""}
      {route === "polering"    ? <Polering />                                              : ""}
      {route === "verktyg"     ? <Verktyg />                                               : ""}
      {route === "varumarken"  ? <Varumarken />                                            : ""}
      {route === "om-oss"      ? <OmOss />                                                 : ""}
      {route === "kontakt"     ? <Kontakt />                                               : ""}
      {produktId               ? <ProduktSida produktId={produktId} valdProdukt={valdProdukt} oppnaProdukt={oppnaProdukt} /> : ""}
    </div>
  );
}

// ===================== PLATSHÅLLARSIDOR =====================

function Lackering()  { return <h2 style={{ padding: "2rem" }}>Lackering</h2>; }
function Karosseri()  { return <h2 style={{ padding: "2rem" }}>Karosseri</h2>; }
function Polering()   { return <h2 style={{ padding: "2rem" }}>Polering</h2>; }
function Verktyg()    { return <h2 style={{ padding: "2rem" }}>Verktyg</h2>; }
function Varumarken() { return <h2 style={{ padding: "2rem" }}>Varumärken</h2>; }
function OmOss()      { return <h2 style={{ padding: "2rem" }}>Om oss</h2>; }
function Kontakt()    { return <h2 style={{ padding: "2rem" }}>Kontakta oss</h2>; }

// ===================== HEM =====================

function Hem({ oppnaProdukt }) {
  const utvalda = [
    { id: "id_0001", artikelnummer: "ART-0001", namn: "Bromsskiva fram", pris: 499,  bilder: ["bromsskiva-fram-1.png"], lager: { antal: 15 } },
    { id: "id_0009", artikelnummer: "ART-0009", namn: "Tändstift",       pris: 89,   bilder: ["tandstift-1.png"],      lager: { antal: 100 } },
    { id: "id_0053", artikelnummer: "ART-0053", namn: "Turbo",           pris: 5999, bilder: ["turbo-1.png"],          lager: { antal: 2 } },
    { id: "id_0025", artikelnummer: "ART-0025", namn: "Kylare",          pris: 1799, bilder: ["kylare-1.png"],         lager: { antal: 4 } },
  ];

  const tjanster = [
    { ikon: "fa-spray-can",  namn: "Lackering",        text: "Professionell lackering och färgmatchning." },
    { ikon: "fa-car-burst",  namn: "Karosseri",        text: "Plåtarbete och karossreparationer." },
    { ikon: "fa-star",       namn: "Polering",         text: "Maskinpolering för skinande resultat." },
    { ikon: "fa-wind",       namn: "Rekonditionering", text: "Invändig och utvändig rekonditionering." },
  ];

  return (
    <div className="hem">

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tagline">Halmstads bästa bildelar</p>
          <h1 className="hero-titel">Kvalitet du<br />kan lita på</h1>
          <p className="hero-text">
            Reservdelar, lackering och karosseri — allt under ett tak i Halmstad.
          </p>
          <div className="hero-knappar">
            <button className="knapp-primer" onClick={() => { window.location.hash = "reservdelar"; }}>
              Se reservdelar
            </button>
            <button className="knapp-sekund" onClick={() => { window.location.hash = "kontakt"; }}>
              Kontakta oss
            </button>
          </div>
        </div>
        <div className="hero-bild-wrap">
          <div className="hero-bild-ring ring-1"></div>
          <div className="hero-bild-ring ring-2"></div>
          <div className="hero-bild-ring ring-3"></div>
          <div className="hero-ikon-center"><i className="fa-solid fa-car"></i></div>
          <div className="hero-badge badge-1"><i className="fa-solid fa-shield-halved"></i> Kvalitetsgaranti</div>
          <div className="hero-badge badge-2"><i className="fa-solid fa-truck"></i> Fri frakt 500kr+</div>
          <div className="hero-badge badge-3"><i className="fa-solid fa-headset"></i> Support vardagar</div>
        </div>
      </section>

      {/* ===== STATISTIK ===== */}
      <section className="statistik">
        <div className="stat-kort"><span className="stat-tal">5 000+</span><span className="stat-label">Artiklar i lager</span></div>
        <div className="stat-kort"><span className="stat-tal">12 år</span><span className="stat-label">I branschen</span></div>
        <div className="stat-kort"><span className="stat-tal">4.9 ★</span><span className="stat-label">Kundbetyg</span></div>
        <div className="stat-kort"><span className="stat-tal">1–3 dagar</span><span className="stat-label">Leveranstid</span></div>
      </section>

      {/* ===== UTVALDA PRODUKTER ===== */}
      <section className="hem-sektion">
        <div className="hem-sektion-topp">
          <h2>Utvalda produkter</h2>
          <button className="visa-alla" onClick={() => { window.location.hash = "reservdelar"; }}>
            Visa alla <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <div className="products">
          {utvalda.map((p) => {
            const antal = p.lager.antal;
            const dotClass = antal === 0 ? "out" : antal <= 5 ? "low" : "";
            const lagerText = antal === 0 ? "Slutsåld" : antal <= 5 ? `Lågt lager — ${antal} kvar` : `I lager — ${antal} st`;
            return (
              <div className="card" key={p.id} onClick={() => oppnaProdukt(p)} style={{ cursor: "pointer" }}>
                <div className="imgbox">
                  <img src={p.bilder[0]} alt={p.namn} />
                </div>
                <div className="card-info">
                  <p className="artikelnummer">{p.artikelnummer}</p>
                  <h2 className="namn">{p.namn}</h2>
                  <p className="pris">{p.pris} kr</p>
                  <div className="lager-status">
                    <span className={`lager-dot ${dotClass}`}></span>
                    <span>{lagerText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== TJÄNSTER ===== */}
      <section className="hem-sektion tjanster-sektion">
        <div className="hem-sektion-topp">
          <h2>Våra tjänster</h2>
          <button className="visa-alla" onClick={() => { window.location.hash = "lackering"; }}>
            Läs mer <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <div className="tjanster-grid">
          {tjanster.map((t, i) => (
            <div className="tjanst-kort" key={i}>
              <div className="tjanst-ikon"><i className={`fa-solid ${t.ikon}`}></i></div>
              <h3>{t.namn}</h3>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BANNER ===== */}
      <section className="hem-banner">
        <div className="banner-innehall">
          <h2>Fri frakt på beställningar över 500 kr</h2>
          <p>Leverans 1–3 vardagar. Enkel retur inom 30 dagar.</p>
          <button className="knapp-primer" onClick={() => { window.location.hash = "reservdelar"; }}>
            Handla nu
          </button>
        </div>
      </section>

    </div>
  );
}

// ===================== PRODUKTSIDA =====================

function ProduktSida({ produktId, valdProdukt, oppnaProdukt }) {
  const [produkt, setProdukt]         = React.useState(valdProdukt);
  const [allaProdukt, setAllaProdukt] = React.useState([]);
  const [aktivBild, setAktivBild]     = React.useState(0);
  const [lagdIKorg, setLagdIKorg]     = React.useState(false);

  // Hämtar alla produkter — behövs för liknande produkter och fallback
  React.useEffect(() => {
    fetch("../../data/products.json")
      .then((r) => r.json())
      .then((data) => {
        setAllaProdukt(data);
        // Om produkt saknas (delad länk) hittar vi den här
        if (!produkt || produkt.id !== produktId) {
          const hittad = data.find((p) => p.id === produktId);
          setProdukt(hittad || null);
        }
      });
  }, [produktId]);

  // Återställ bild och köpknapp när produkt byter
  React.useEffect(() => {
    setAktivBild(0);
    setLagdIKorg(false);
    // Scrolla till toppen av sidan vid byte
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [produktId]);

  if (!produkt) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Laddar produkt...</p>
      </div>
    );
  }

  // Liknande produkter — samma kategori, max 4 st, exkludera nuvarande
  const liknande = allaProdukt
    .filter((p) => p.kategori === produkt.kategori && p.id !== produkt.id)
    .slice(0, 4);

  const antal    = produkt.lager.antal;
  const dotClass = antal === 0 ? "out" : antal <= 5 ? "low" : "";
  const lagerText =
    antal === 0       ? "Slutsåld" :
    antal <= 5        ? `Lågt lager — ${antal} kvar` :
                        `I lager — ${antal} st`;

  function laggIKorg() {
    setLagdIKorg(true);
    setTimeout(() => setLagdIKorg(false), 2000);
  }

  return (
    <div className="produkt-sida">

      {/* Tillbaka-knapp */}
      <button className="tillbaka-knapp" onClick={() => window.history.back()}>
        <i className="fa-solid fa-arrow-left"></i> Tillbaka
      </button>

      <div className="produkt-layout">

        {/* ===== VÄNSTER: BILDER ===== */}
        <div className="produkt-bilder">
          <div className="produkt-huvudbild">
            <img src={produkt.bilder[aktivBild]} alt={produkt.namn} />
            {produkt.skick.skadad && (
              <span className="skada-badge">
                <i className="fa-solid fa-triangle-exclamation"></i> Skada noterad
              </span>
            )}
          </div>
          {produkt.bilder.length > 1 && (
            <div className="produkt-thumbnails">
              {produkt.bilder.map((bild, i) => (
                <div
                  key={i}
                  className={`thumbnail ${i === aktivBild ? "aktiv" : ""}`}
                  onClick={() => setAktivBild(i)}
                >
                  <img src={bild} alt={`Bild ${i + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== HÖGER: INFO ===== */}
        <div className="produkt-info">

          <div className="produkt-meta">
            <span className="produkt-kategori">{produkt.kategori} / {produkt.underkategori}</span>
            <span className="produkt-artnr">{produkt.artikelnummer}</span>
          </div>

          <h1 className="produkt-namn">{produkt.namn}</h1>

          <div className="produkt-pris-rad">
            <span className="produkt-pris">{produkt.pris} kr</span>
            <div className="lager-status">
              <span className={`lager-dot ${dotClass}`}></span>
              <span>{lagerText}</span>
            </div>
          </div>

          <p className="produkt-beskrivning">{produkt.beskrivning}</p>

          {/* Skadebeskrivning */}
          {produkt.skick.skadad && (
            <div className="skada-info">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <div>
                <strong>Skada:</strong> {produkt.skick.skadebeskrivning}
                <br />
                <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                  Plats: {produkt.skick.skadeplats}
                </span>
              </div>
            </div>
          )}

          {/* Köpknapp */}
          <button
            className={`knapp-primer kop-knapp ${lagdIKorg ? "lagd" : ""}`}
            onClick={laggIKorg}
            disabled={antal === 0}
          >
            {antal === 0 ? "Slutsåld" :
             lagdIKorg   ? <><i className="fa-solid fa-check"></i> Lagd i kundvagn!</> :
                           <><i className="fa-solid fa-cart-shopping"></i> Lägg i kundvagn</>}
          </button>

          {/* Lagerinfo */}
          <div className="produkt-detaljer-rad">
            <div className="detalj-kort">
              <i className="fa-solid fa-warehouse"></i>
              <div>
                <span className="detalj-label">Lagerplats</span>
                <span className="detalj-varde">{produkt.lager.plats}</span>
              </div>
            </div>
            <div className="detalj-kort">
              <i className="fa-solid fa-boxes-stacked"></i>
              <div>
                <span className="detalj-label">Antal i lager</span>
                <span className="detalj-varde">{produkt.lager.antal} st</span>
              </div>
            </div>
          </div>

          {/* Kompatibilitet */}
          <div className="produkt-sektion">
            <h3><i className="fa-solid fa-car"></i> Passar till</h3>
            <div className="kompatibilitet-lista">
              {produkt.kompatibilitet.map((k, i) => (
                <div className="kompatibilitet-rad" key={i}>
                  <span className="komp-marke">{k.marke}</span>
                  <span className="komp-modell">{k.modell}</span>
                  <span className="komp-ar">{k.ar_fran}–{k.ar_till}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alternativa artikelnummer */}
          {produkt.alternativa_artikelnummer.length > 0 && (
            <div className="produkt-sektion">
              <h3><i className="fa-solid fa-barcode"></i> Alternativa artikelnummer</h3>
              <div className="alt-artnr-lista">
                {produkt.alternativa_artikelnummer.map((a, i) => (
                  <span className="alt-artnr-tagg" key={i}>{a}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ===== LIKNANDE PRODUKTER ===== */}
      {liknande.length > 0 && (
        <div className="liknande-sektion">
          <h2 className="liknande-titel">
            Fler produkter i <span>{produkt.kategori}</span>
          </h2>
          <div className="products">
            {liknande.map((p) => {
              const a = p.lager.antal;
              const dc = a === 0 ? "out" : a <= 5 ? "low" : "";
              const lt = a === 0 ? "Slutsåld" : a <= 5 ? `Lågt lager — ${a} kvar` : `I lager — ${a} st`;
              return (
                <div className="card" key={p.id} onClick={() => oppnaProdukt(p)} style={{ cursor: "pointer" }}>
                  <div className="imgbox">
                    <img src={p.bilder[0]} alt={p.namn} />
                  </div>
                  <div className="card-info">
                    <p className="artikelnummer">{p.artikelnummer}</p>
                    <h2 className="namn">{p.namn}</h2>
                    <p className="pris">{p.pris} kr</p>
                    <div className="lager-status">
                      <span className={`lager-dot ${dc}`}></span>
                      <span>{lt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

// ===================== RESERVDELAR =====================

function Products({ onValjProdukt }) {
  const [products, setProducts]         = React.useState([]);
  const [sokterm, setSokterm]           = React.useState("");
  const [valdKategori, setValdKategori] = React.useState("Alla");
  const [sortering, setSortering]       = React.useState("standard");
  const [visaFilter, setVisaFilter]     = React.useState(false);
  const [prisMin, setPrisMin]           = React.useState(0);
  const [prisMax, setPrisMax]           = React.useState(10000);
  const [endastILager, setEndastILager] = React.useState(false);

  React.useEffect(() => {
    fetch("../../data/products.json")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        // Sätt prismax till högsta priset i datan
        const max = Math.max(...data.map((p) => p.pris));
        setPrisMax(max);
      });
  }, []);

  // Alla unika kategorier
  const kategorier = ["Alla", ...Array.from(new Set(products.map((p) => p.kategori)))];

  // Filtrering
  let filtrerade = products.filter((p) => {
    const matchSok      = p.namn.toLowerCase().includes(sokterm.toLowerCase()) ||
                          p.artikelnummer.toLowerCase().includes(sokterm.toLowerCase()) ||
                          p.beskrivning.toLowerCase().includes(sokterm.toLowerCase());
    const matchKategori = valdKategori === "Alla" || p.kategori === valdKategori;
    const matchPris     = p.pris >= prisMin && p.pris <= prisMax;
    const matchLager    = !endastILager || p.lager.antal > 0;
    return matchSok && matchKategori && matchPris && matchLager;
  });

  // Sortering
  if (sortering === "pris-asc")  filtrerade = [...filtrerade].sort((a, b) => a.pris - b.pris);
  if (sortering === "pris-desc") filtrerade = [...filtrerade].sort((a, b) => b.pris - a.pris);
  if (sortering === "namn-asc")  filtrerade = [...filtrerade].sort((a, b) => a.namn.localeCompare(b.namn));
  if (sortering === "lager")     filtrerade = [...filtrerade].sort((a, b) => b.lager.antal - a.lager.antal);

  const maxPrisIDatan = products.length ? Math.max(...products.map((p) => p.pris)) : 10000;

  function rensaFilter() {
    setSokterm("");
    setValdKategori("Alla");
    setSortering("standard");
    setPrisMin(0);
    setPrisMax(maxPrisIDatan);
    setEndastILager(false);
  }

  const aktivaFilter =
    valdKategori !== "Alla" || endastILager || sortering !== "standard" ||
    prisMin > 0 || prisMax < maxPrisIDatan;

  return (
    <div className="reservdelar-sida">

      {/* ===== TOPBAR ===== */}
      <div className="reservdelar-topbar">
        <div className="reservdelar-sok-wrap">
          <i className="fa-solid fa-magnifying-glass sok-ikon"></i>
          <input
            className="reservdelar-sok"
            type="text"
            placeholder="Sök produkt, artikelnummer..."
            value={sokterm}
            onChange={(e) => setSokterm(e.target.value)}
          />
          {sokterm && (
            <button className="sok-rensa" onClick={() => setSokterm("")}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
        <div className="reservdelar-topbar-right">
          <select
            className="sortering-select"
            value={sortering}
            onChange={(e) => setSortering(e.target.value)}
          >
            <option value="standard">Sortera: Standard</option>
            <option value="pris-asc">Pris: Lägst först</option>
            <option value="pris-desc">Pris: Högst först</option>
            <option value="namn-asc">Namn: A–Ö</option>
            <option value="lager">Lagerantal</option>
          </select>
          <button
            className={`filter-knapp ${visaFilter ? "aktiv" : ""} ${aktivaFilter ? "har-filter" : ""}`}
            onClick={() => setVisaFilter(!visaFilter)}
          >
            <i className="fa-solid fa-sliders"></i>
            Filter
            {aktivaFilter && <span className="filter-badge"></span>}
          </button>
        </div>
      </div>

      {/* ===== FILTERPANEL ===== */}
      <div className={`filter-panel ${visaFilter ? "open" : ""}`}>
        <div className="filter-panel-inner">

          {/* Kategorier */}
          <div className="filter-grupp">
            <p className="filter-grupp-titel">Kategori</p>
            <div className="kategori-lista">
              {kategorier.map((k) => (
                <button
                  key={k}
                  className={`kategori-pill ${valdKategori === k ? "aktiv" : ""}`}
                  onClick={() => setValdKategori(k)}
                >
                  {k}
                  {k !== "Alla" && (
                    <span className="kategori-antal">
                      {products.filter((p) => p.kategori === k).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Prisintervall */}
          <div className="filter-grupp">
            <p className="filter-grupp-titel">
              Pris: <strong>{prisMin} kr — {prisMax} kr</strong>
            </p>
            <div className="pris-sliders">
              <input
                type="range"
                min="0"
                max={maxPrisIDatan}
                step="50"
                value={prisMin}
                onChange={(e) => setPrisMin(Math.min(Number(e.target.value), prisMax - 50))}
                className="pris-slider"
              />
              <input
                type="range"
                min="0"
                max={maxPrisIDatan}
                step="50"
                value={prisMax}
                onChange={(e) => setPrisMax(Math.max(Number(e.target.value), prisMin + 50))}
                className="pris-slider"
              />
            </div>
          </div>

          {/* Lager */}
          <div className="filter-grupp">
            <p className="filter-grupp-titel">Tillgänglighet</p>
            <label className="lager-toggle">
              <input
                type="checkbox"
                checked={endastILager}
                onChange={(e) => setEndastILager(e.target.checked)}
              />
              <span className="toggle-track">
                <span className="toggle-thumb"></span>
              </span>
              Visa endast i lager
            </label>
          </div>

          {/* Rensa */}
          {aktivaFilter && (
            <button className="rensa-filter-knapp" onClick={rensaFilter}>
              <i className="fa-solid fa-rotate-left"></i> Rensa alla filter
            </button>
          )}

        </div>
      </div>

      {/* ===== RESULTATRAD ===== */}
      <div className="resultat-rad">
        <p className="resultat-text">
          {filtrerade.length} {filtrerade.length === 1 ? "produkt" : "produkter"}
          {valdKategori !== "Alla" && <span> i <strong>{valdKategori}</strong></span>}
        </p>
        {aktivaFilter && (
          <button className="rensa-link" onClick={rensaFilter}>
            Rensa filter <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      {/* ===== PRODUKTGRID ===== */}
      {filtrerade.length === 0 ? (
        <div className="inga-resultat">
          <i className="fa-solid fa-box-open"></i>
          <p>Inga produkter matchade din sökning.</p>
          <button className="knapp-sekund" onClick={rensaFilter}>Rensa filter</button>
        </div>
      ) : (
        <div className="products">
          {filtrerade.map((p) => (
            <Prod key={p.id} prod={p} onValjProdukt={onValjProdukt} />
          ))}
        </div>
      )}

    </div>
  );
}

function Prod({ prod, onValjProdukt }) {
  const antal    = prod.lager.antal;
  const dotClass = antal === 0 ? "out" : antal <= 5 ? "low" : "";
  const lagerText =
    antal === 0 ? "Slutsåld" :
    antal <= 5  ? `Lågt lager — ${antal} kvar` :
                  `I lager — ${antal} st`;

  return (
    <div className="card" onClick={() => onValjProdukt(prod)} style={{ cursor: "pointer" }}>
      <div className="imgbox">
        {prod.skick.skadad && (
          <span className="kort-skada-badge">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </span>
        )}
        <img src={prod.bilder[0]} alt={prod.namn} />
      </div>
      <div className="card-info">
        <p className="artikelnummer">{prod.artikelnummer}</p>
        <h2 className="namn">{prod.namn}</h2>
        <p className="pris">{prod.pris} kr</p>
        <div className="lager-status">
          <span className={`lager-dot ${dotClass}`}></span>
          <span>{lagerText}</span>
        </div>
      </div>
    </div>
  );
}