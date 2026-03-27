const el = document.querySelector("#footer");
ReactDOM.createRoot(el).render(<Footer />);

function Footer() {
  return (
    <footer>
      
        <div className="footer-kolumn">
          <h3 onClick={toggleMeny}>
            Onwheels <i className="fa-solid fa-angle-down"></i>
          </h3>
          <div className="droppDown">
            <a href="#">Försäljningsvillkor</a>
            <a href="#">Betalningsinformation</a>
            <a href="#">Leveransinformation</a>
            <a href="#">Fraktinformation</a>
            <a href="#">Kontovillkor</a>
            <a href="#">Integritetspolicy</a>
            <a href="#">Cookiepolicy</a>
          </div>
        </div>

        <div className="footer-kolumn">
          <h3 onClick={toggleMeny} id="tjänster">
            Tjänster <i className="fa-solid fa-angle-down"></i>
          </h3>
          <div className="droppDown">
            <a href="#">Lackering</a>
            <a href="#">Karosseri</a>
            <a href="#">Rekonditionering</a>
            <a href="#">Stenskottsskydd</a>
            <a href="#">Vindrutebyte</a>
            <a href="#">Däckbyte</a>
            <a href="#">Biltvätt</a>
          </div>
        </div>

        <div className="footer-kolumn">
          <h3 onClick={toggleMeny}>
            Kundservice <i className="fa-solid fa-angle-down"></i>
          </h3>
          <div className="droppDown">
            <a href="#">Beställning</a>
            <a href="#">Leverans</a>
            <a href="#">Reklamation & återköp</a>
            <a href="#">Teknisk support</a>
            <a href="#">Betalning</a>
            <a href="#">Kontakta oss</a>
          </div>
        </div>

        <div className="footer-kolumn">
          <h3 onClick={toggleMeny}>
            Om Onwheels <i className="fa-solid fa-angle-down"></i>
          </h3>
          <div className="droppDown">
            <a href="#">Om oss</a>
            <a href="#">Karriär</a>
            <a href="#">Hållbart val</a>
            <a href="#">Våra varumärken</a>
            <a href="#">Hitta butik</a>
            <a href="#">Säkerhet och Integritet</a>
          </div>
        </div>
      
    </footer>
  );
}
/* cloude hjälpte */
function toggleMeny(e) {
  const droppDown = e.currentTarget.nextElementSibling;
  droppDown.classList.toggle("open");
  e.currentTarget.querySelector("i").classList.toggle("open");
}

/* function toggleMeny(e) {
  e.currentTarget.nextElementSibling.classList.toggle("open");
} */