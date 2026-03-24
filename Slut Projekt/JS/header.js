const el = document.querySelector("#header");
ReactDOM.createRoot(el).render(<Header />);

function Header() {
  return (
    <header>
      <nav>
        <div className="nav-top">
          <div className="logo">
            <img src="../IMG/Logo.png" alt="OnWheels logotyp" />
          </div>
            <span className="hamburger" id="hamburger" onClick={toggleNav}>
              &equiv;
           </span>
        </div>
        <div className="nav-links" id="navLinks">
          <a href="#">Startsida</a>
          <a href="#">Reservdelar</a>
          <a href="#">Lackering</a>
          <a href="#">Karosseri</a>
          <a href="#">Verktyg</a>
          <a href="#">Varumärken</a>
          <a href="#">Om oss</a>
          <a href="#" className="highlight">Kontakta oss</a>
        </div>
      </nav>
    </header>
  );
}

function toggleNav() {
  document.querySelector("#navLinks").classList.toggle("open");
}
