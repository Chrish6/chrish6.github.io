const el = document.querySelector("#m");
ReactDOM.createRoot(el).render(<M />);

function M() {
  const meddelanden = [
    "Välkommen till Onwheels",
    "Fri frakt över 500 kr",
    "Reservdelar i toppkvalitet",
    "Öppet måndag–fredag 08–17",
    "Halmstads bästa bildelar",
  ];

  return (
    <div className="Messegetop">
      <div className="Messegetop-inner">
        {meddelanden.map((m, i) => <span key={i}>{m} &nbsp;•</span>)}
        {meddelanden.map((m, i) => <span key={"b" + i}>{m} &nbsp;•</span>)}
      </div>
    </div>
  );
}

