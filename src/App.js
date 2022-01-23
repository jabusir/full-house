import { useState, useEffect } from "react";

function App() {
  const [deck, setDeck] = useState("");
  const [cardCount, setCardCount] = useState(0);
  const [hand, setHand] = useState({});
  const [fullHouse, setFullHouse] = useState(false);

  return <div className="App"></div>;
}

export default App;
