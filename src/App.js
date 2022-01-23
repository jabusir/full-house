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
      drawCards();
    }
  }, [deck]);

  useEffect(() => {
    if (cards.length === 0 && deck !== "") {
      drawCards();
    }

    let handObj = {};
    cards.forEach((card) => {
      let timesSeen = handObj[card.value];
      if (timesSeen) {
        handObj[card.value] = timesSeen + 1;
      }
      handObj[card.value] = 1;
    });
    setHand(handObj);
  }, [cards.length]);

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

  const drawCards = (amount = 5) => {
    fetchCards(deck, amount).then((res) => {
      if (res.success) {
        setCards(cards.concat(res.cards));
        setCardCount(5);
      }
    });
  };

  const addCards = () => {
    if (cardCount < 5) {
      drawCards(5 - cardCount);
    }
  };

  const deleteCard = (code) => {
    setPile(pile.concat(cards.filter((card) => card.code === code)));
    setCards(cards.filter((card) => card.code !== code));
    setCardCount(cardCount - 1);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Deck addCards={addCards} />
      {!fullHouse && (
        <CardsContainer>
          {cards.map((card, i) => (
            <Card key={i} deleteCard={deleteCard} data={card} />
          ))}
        </CardsContainer>
      )}
    </div>
  );
}
export default App;
