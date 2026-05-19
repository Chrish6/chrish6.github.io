const el = document.querySelector("#header");
ReactDOM.createRoot(el).render(<Header />);





function navTo(e, path) {
  e.preventDefault();
  window.location.hash = path;
}






function toggleNav() {
  document.querySelector("#navLinks").classList.toggle("open");
}

function toggleSearch() {
  document.querySelector(".mobile-search-input").classList.toggle("open");
}




function handleKeyDown(ev) {
  if (ev.key === "Enter") {
    toggleSearch();
  }
}



function Header() {
  function contentSearch(ev) {
    
    let s = ev.target.value.toLowerCase();
    if (window.location.hash !== "#reservdelar") {
      window.location = "#reservdelar";
    }


    const divs = document.querySelectorAll(".card");
    divs.forEach((card) => {
      card.classList.remove("hidden");



      const titel = card.children[1].innerText;
      const artikelnummer = card.children[2].innerText;
      const beskrivning = card.children[3].innerText;


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
              <img src="./Frontend/IMG/Logo.png" alt="Onwheels logotyp" />
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
            <span className="mobile-search" onClick={toggleSearch}>
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
          <a href="#lackering" onClick={(e) => navTo(e, "lackering")}>Lackering</a>
          <a href="#karosseri" onClick={(e) => navTo(e, "karosseri")}>Karosseri</a>
          <a href="#polering" onClick={(e) => navTo(e, "polering")}>Polering</a>
          <a href="#verktyg" onClick={(e) => navTo(e, "verktyg")}>Verktyg</a>
          <a href="#varumarken" onClick={(e) => navTo(e, "varumarken")}>Varumärken</a>
          <a href="#om-oss" onClick={(e) => navTo(e, "om-oss")}>Om oss</a>
          <a href="#kontakt" onClick={(e) => navTo(e, "kontakt")}>Kontakta oss</a>
          <a href="#">Tjänster</a>
        </div>
      </nav>
      <div className="mobile-search-input">
        <input
          type="text"
          onKeyUp={contentSearch}
          placeholder="Vad letar du efter?"
          onKeyDown={handleKeyDown}
          
        />
      </div>
    </header>
  );
}