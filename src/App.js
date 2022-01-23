import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./components/Card";
import Deck from "./components/Deck";
import { fetchCards, fetchDeck } from "./api";

const CardsContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-evenly;
  margin: 0 auto;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

function App() {
  const [deck, setDeck] = useState("");
  const [cardCount, setCardCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [hand, setHand] = useState({});
  const [fullHouse, setFullHouse] = useState(false);
  const [gameLoss, setGameLoss] = useState(false);

  useEffect(() => {
    if (deck === "") {
      getDeck();
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

    const handObj = cards.reduce((acc, currCard) => {
      return {
        ...acc,
        [currCard.value]: acc[currCard.value] ? acc[currCard.value] + 1 : 1,
      };
    }, {});
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

  const getDeck = () => {
    fetchDeck().then((res) => {
      if (res.success) {
        setDeck(res.deck_id);
      }
    });
  };

  const drawCards = (amount = 5) => {
    fetchCards(deck, amount).then((res) => {
      if (res.success) {
        setCards(cards.concat(res.cards));
        setCardCount(5);
      }
      if (res.remaining === 0) {
        setGameLoss(true);
      }
    });
  };

  const addCards = () => {
    if (cardCount < 5) {
      drawCards(5 - cardCount);
    }
  };

  const deleteCard = (code) => {
    setCards(cards.filter((card) => card.code !== code));
    setCardCount(cardCount - 1);
  };

  const resetGame = () => {
    getDeck();
  };

  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#FAFAFA" }}>
      <Deck addCards={addCards} />
      <CardsContainer>
        {cards.map((card, i) => (
          <Card
            key={i}
            deleteCard={deleteCard}
            data={card}
            fullHouse={fullHouse}
          />
        ))}
      </CardsContainer>
      {gameLoss && <div onClick={resetGame}>You lose</div>}
    </div>
  );
}
export default App;
