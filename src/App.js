import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./components/Card";
import Deck from "./components/Deck";
import { fetchCards, fetchDeck } from "./api";

const CardsContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-evenly;
  margin: 15px auto;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Header = styled.div`
  text-align: center;
  width: 100%;
  position: relative;
  top: 5vh;
  font-size: 24px;
  color: grey;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Button = styled.button`
  margin: 0 auto;
`;

const FullHouseImg = styled.img`
  max-width: 100%;
  margin-left: 10vw;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

function App() {
  const [deck, setDeck] = useState("");
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
    if (cards.length === 0 && deck !== "") {
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
    if (!fullHouse && !gameLoss) {
      fetchCards(deck, amount).then((res) => {
        if (res.success) {
          setCards(cards.concat(res.cards));
        }
        if (res.remaining === 0) {
          setGameLoss(true);
        }
      });
    }
  };

  const addCards = () => {
    if (cards.length < 5) {
      drawCards(5 - cards.length);
    }
  };

  const deleteCard = (code) => {
    if (!fullHouse) {
      setCards(cards.filter((card) => card.code !== code));
    }
  };

  const resetGame = () => {
    setFullHouse(false);
    setGameLoss(false);
    setHand({});
    setCards([]);
    getDeck();
  };

  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#FAFAFA" }}>
      {gameLoss && <Header>You lost</Header>}
      <Deck addCards={addCards} />
      {fullHouse && <FullHouseImg src="/fullhouse.svg" />}
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
      {(gameLoss || fullHouse) && (
        <ButtonContainer>
          <Button onClick={resetGame}>Run it Back</Button>
        </ButtonContainer>
      )}
    </div>
  );
}
export default App;
