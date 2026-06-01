# Dokumentation Pefr

## Webutveckling 1

### react router

En egen version av en simpel men effektiv react router som använder URL-hashen (t.ex. `#reservdelar`) för att navigera mellan sidor utan att ladda om webbläsaren.

### header.jsx

```JSX
function header(){
return (
    <header>
        <div className="nav-links" id="navLinks">
          <a href="#reservdelar" onClick={(e) => navTo(e, "reservdelar")}>Reservdelar</a>
          <a href="#lackering" onClick={(e) => navTo(e, "lackering")}>Lackering</a>
          <a href="#karosseri" onClick={(e) => navTo(e, "karosseri")}>Karosseri</a>
          <a href="#polering" onClick={(e) => navTo(e, "polering")}>Polering</a>
          <a href="#verktyg" onClick={(e) => navTo(e, "verktyg")}>Verktyg</a>
          <a href="#varumarken" onClick={(e) => navTo(e, "varumarken")}>Varumärken</a>
          <a href="#om-oss" onClick={(e) => navTo(e, "om-oss")}>Om oss</a>
          <a href="#kontakt" onClick={(e) => navTo(e, "kontakt")}>Kontakta oss</a>
        </div>
  </header>
  );
}

// Det första som händer när man klickar en länk:
// e.preventDefault() stoppar webbläsaren från att ladda om sidan.
// Sedan sätts URL-hashen till t.ex. "reservdelar", vilket triggar routern i app.jsx.
function navTo(e, path) {
  e.preventDefault();
  window.location.hash = path;
}


```

### app.jsx

Här finns själva routern - läser URL-hashen och bestämmer vilken sida som ska användas

```JSX
// Läser hashen ur URL:en och tar bort #-tecknet.
// Om ingen hash finns används "hem" som standard.
function getRoute() {
  const hash = window.location.hash.replace("#", "");
  return hash || "hem";
}

function App() {
    // vilken sida är vi på?
    const [route, setRoute] = React.useState(getRoute());

    // lyssna på när URL:en ändras och uppdatera sidan
    React.useEffect(() => {
        const handleHash = () => setRoute(getRoute());
        window.addEventListener("hashchange", handleHash);
        return () => window.removeEventListener("hashchange", handleHash);
  }, []);


    // visa rätt sida beroende på route
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
```
### Sammanfattning
Hash-routern fungerar genom att hålla koll på `#`-delen i URL:en istället för att ladda nya sidor från servern. När användaren klickar en länk i headern körs `navTo()`, som stoppar den vanliga länken och byter hashen till t.ex. `#reservdelar`. Det triggar ett `hashchange`-event i webbläsaren, som `useEffect` i App-komponenten lyssnar på. När eventet kommer in körs `getRoute()` som läser av den nya hashen och returnerar den som en sträng. Den strängen sparas i `route`-staten, och React renderar om komponenten – den här gången med rätt sida synlig. Alla andra sidor renderas inte alls. Resultatet är en app som känns som att man navigerar mellan sidor, fast egentligen laddas ingenting om.