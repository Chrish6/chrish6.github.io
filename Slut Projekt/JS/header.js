const el = document.querySelector("#header");
ReactDOM.createRoot(el).render(<Header />);

function Header() {
  return (
    <header>
      <nav>
        <div className="nav-top">
          <span className="menuButton" id="menuButton" onClick={toggleNav}>
            <i className="fa-solid fa-bars"></i>
          </span>
          <div className="logo" href="/">
            <img src="../IMG/Logo.png" alt="" />
          </div>
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
          <a href="#">Reservdelar</a>
          <a href="#">Lackering</a>
          <a href="#">Karosseri</a>
          <a href="#">Polering</a>
          <a href="#">Verktyg</a>
          <a href="#">Varumärken</a>
          <a href="#">Om oss</a>
          <a href="#">Kontakta oss</a>
          <a href="#tjänster">Tjänster</a>
        </div>
      </nav>
    </header>
  );
}

function toggleNav() {
  document.querySelector("#navLinks").classList.toggle("open");
}