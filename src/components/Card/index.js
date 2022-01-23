import styled from "styled-components";

const Container = styled.div`
  width: 250px;
  height: 400px;
`;

const StyledCard = styled.img`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 15px;
  max-height: ${(props) => (props.fullHouse ? "70%" : "auto")};
`;

const Card = ({ data, deleteCard, fullHouse }) => {
  return (
    <Container onClick={() => deleteCard(data.code)}>
      <StyledCard
        fullHouse={fullHouse}
        src={fullHouse ? `/bob.jpg` : data.image}
        alt={data.code}
      />
    </Container>
  );
};

export default Card;
