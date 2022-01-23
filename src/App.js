import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./components/Card";
import Deck from "./components/Deck";
import { fetchCards, fetchDeck } from "./api";

const CardsContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function App() {
  const [deck, setDeck] = useState("");
  const [cardCount, setCardCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [hand, setHand] = useState({});
  const [fullHouse, setFullHouse] = useState(false);
  const [pile, setPile] = useState([]);

  useEffect(() => {
    if (deck === "") {
      fetchDeck().then((res) => {
        if (res.success) {
          setDeck(res.deck_id);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (cardCount === 0 && deck !== "") {
      fetchCards(deck, 5).then((res) => {
        if (res.success) {
          setCards(res.cards);
          setCardCount(5);
        }
      });
    }
  }, [deck]);

  useEffect(() => {
    let threeOfAKind = false;
    let pair = false;
    Object.values(hand).forEach((count) => {
      if (count === 2) {
        pair = true;
      }
      if (count === 3) {
        threeOfAKind = true;
      }
    });
    if (pair && threeOfAKind) {
      setFullHouse(true);
    }
  }, [hand]);

  const handleAddCards = () => {};

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Deck onClick={handleAddCards} />
      <CardsContainer>
        {cards.map((card, i) => (
          <Card key={i} data={card} />
        ))}
      </CardsContainer>
    </div>
  );
}

export default App;
