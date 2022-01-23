import styled from "styled-components";

const Container = styled.div`
  width: 250px;
  height: 400px;
`;

const Card = ({ data, deleteCard }) => {
  return (
    <Container onClick={() => deleteCard(data.code)}>
      <img src={data.image} alt={data.code} />
    </Container>
  );
};

export default Card;
