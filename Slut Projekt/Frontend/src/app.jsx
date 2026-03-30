const el = document.querySelector("#app");
ReactDOM.createRoot(el).render(<App />);



function App() {
  return (
    <div className="app">
      <Products />
    </div>
  );
}

function Products() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await fetch("../../data/products.json");
    const data = await res.json();
    setProducts(data);
  }

  return (
    <div className="products">
      {products.map((p) => (
        <Prod key={p.id} prod={p} />
      ))}
    </div>
  );
}


function Prod({ prod }) {
  return (
    <div className="card">
      <div className="imgbox">
        <img src={prod.bilder[0]} alt={prod.namn} />
      </div>
      <div className="card-info">
        <p className="artikelnummer">{prod.artikelnummer}</p>
        <h2 className="namn">{prod.namn}</h2>
        <p className="beskrivning">{prod.beskrivning}</p>
        <p className="kategori">{prod.kategori} — {prod.underkategori}</p>
        <p className="pris">{prod.pris} kr</p>
      </div>
    </div>
  );
}