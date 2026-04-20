const el = document.querySelector("#header");
ReactDOM.createRoot(el).render(<Header />);

// navTo() anropas när användaren klickar på en länk.
// e.preventDefault() stoppar webbläsaren från att följa href:en på vanligt sätt.
// Sedan sätter den hash i URL:en → App() fångar upp hashchange och byter sida.
function navTo(e, path) {
  e.preventDefault();
  window.location.hash = path;
}

function handleSpecial(e) {
  e.preventDefault(); // stoppa länk-händelsen
  const target = e.target.dataset.target; // leta upp den riktiga #target som vi vill bli scrollad till

  const targetElement = document.querySelector(target); // Leta upp själva elementet
  const rect = targetElement.getBoundingClientRect(); // få uppgifter om dess geometriska uppbyggnad

  const y = rect.top; // Standard vertical coordinate
  window.scrollTo(0, y);
}

function Header() {
  function contentSearch(ev) {
    let s = ev.target.value.toLowerCase();
    
    const divs = document.querySelectorAll(".card");

    divs.forEach((card) => {
      card.classList.remove("hidden");

      const titel = card.children[0].innerText;
      const artikelnummer = card.children[1].innerText;
      const beskrivning = card.children[2].innerText;

      const result = titel.toLowerCase().search(s);
      const result2 = artikelnummer.toLowerCase().search(s);
      const result3 = beskrivning.toLowerCase().search(s);

      if (result < 0 && result2 < 0 && result3 < 0) {
        card.classList.add("hidden");
      }
    });
  }

  return (
    <header>
      <nav>
        <div className="nav-top">
          <span className="menuButton" id="menuButton" onClick={toggleNav}>
            <i className="fa-solid fa-bars"></i>
          </span>
          <a href="#hem" onClick={(e) => navTo(e, "hem")}>
            <div className="logo">
              <img src="../IMG/Logo.png" alt="Onwheels logotyp" />
            </div>
          </a>
          <div className="nav-search">
            <input
              type="text"
              onKeyUp={contentSearch}
              placeholder="Vad letar du efter?"
            />
          </div>
          <div className="nav-top-right">
            <span className="mobile-search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <div className="nav-actions">
              <a href="#">
                <i className="fa-solid fa-user"></i> Logga in
              </a>
              <a href="#">
                <i className="fa-solid fa-circle-user"></i> Skapa konto
              </a>
              <a href="#">
                <i className="fa-solid fa-location-dot"></i> Hitta butik
              </a>
            </div>
            <a href="#" className="cart">
              <i className="fa-solid fa-cart-shopping"></i> Kundvagn
            </a>
          </div>
        </div>
        <div className="nav-links" id="navLinks">
          <a href="#reservdelar" onClick={(e) => navTo(e, "reservdelar")}>
            Reservdelar
          </a>
          <a href="#lackering" onClick={(e) => navTo(e, "lackering")}>
            Lackering
          </a>
          <a href="#karosseri" onClick={(e) => navTo(e, "karosseri")}>
            Karosseri
          </a>
          <a href="#polering" onClick={(e) => navTo(e, "polering")}>
            Polering
          </a>
          <a href="#verktyg" onClick={(e) => navTo(e, "verktyg")}>
            Verktyg
          </a>
          <a href="#varumarken" onClick={(e) => navTo(e, "varumarken")}>
            Varumärken
          </a>
          <a href="#om-oss" onClick={(e) => navTo(e, "om-oss")}>
            Om oss
          </a>
          <a href="#kontakt" onClick={(e) => navTo(e, "kontakt")}>
            Kontakta oss
          </a>
          <a
            href="Kom och hjälp mig kalle anka"
            data-target="#tjänster"
            onClick={handleSpecial}
          >
            Tjänster
          </a>
        </div>
      </nav>
    </header>
  );
}

// toggleNav() öppnar/stänger mobilmenyn genom att toggla CSS-klassen "open"
function toggleNav() {
  document.querySelector("#navLinks").classList.toggle("open");
}
