import styled from "styled-components";

const StyledImage = styled.img`
  height: 300px;
  margin: 20px;
  margin-bottom: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
`;

const Deck = ({ addCards }) => {
  return <StyledImage onClick={addCards} src="/deck.jpg" alt="Deck of Cards" />;
};

export default Deck;
