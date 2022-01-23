import styled from "styled-components";

const Container = styled.div``;

const Card = ({ data }) => {
  return (
    <Container>
      <img src={data.image} alt={data.code} />
    </Container>
  );
};

export default Card;
