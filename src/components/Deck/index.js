import styled from "styled-components";

const StyledImage = styled.img`
  height: 300px;
`;

const Deck = ({ addCards }) => {
  return <StyledImage onClick={addCards} src="/deck.jpg" alt="Deck of Cards" />;
};

export default Deck;