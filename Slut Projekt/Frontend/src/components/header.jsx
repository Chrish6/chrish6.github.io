const el = document.querySelector("#header");
ReactDOM.createRoot(el).render(<Header />);

// navTo() anropas när användaren klickar på en länk.
// e.preventDefault() stoppar webbläsaren från att följa href:en på vanligt sätt.
// Sedan sätter den hash i URL:en → App() fångar upp hashchange och byter sida.
function navTo(e, path) {
  e.preventDefault();
  window.location.hash = path;
}

function Header() {
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
            <input type="text" placeholder="Vad letar du efter?" />
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
          <a href="#reservdelar" onClick={(e) => navTo(e, "reservdelar")}>Reservdelar</a>
          <a href="#lackering"   onClick={(e) => navTo(e, "lackering")}>Lackering</a>
          <a href="#karosseri"   onClick={(e) => navTo(e, "karosseri")}>Karosseri</a>
          <a href="#polering"    onClick={(e) => navTo(e, "polering")}>Polering</a>
          <a href="#verktyg"     onClick={(e) => navTo(e, "verktyg")}>Verktyg</a>
          <a href="#varumarken"  onClick={(e) => navTo(e, "varumarken")}>Varumärken</a>
          <a href="#om-oss"      onClick={(e) => navTo(e, "om-oss")}>Om oss</a>
          <a href="#kontakt"     onClick={(e) => navTo(e, "kontakt")}>Kontakta oss</a>
          <a href="#tjänster">Tjänster</a>
        </div>
      </nav>
    </header>
  );
}

// toggleNav() öppnar/stänger mobilmenyn genom att toggla CSS-klassen "open"
function toggleNav() {
  document.querySelector("#navLinks").classList.toggle("open");
}