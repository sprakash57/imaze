import { Link } from 'react-router';
import styled from '@emotion/styled';

const NotFound = () => {
  return (
    <Container>
      <span role="img">¯\_(ツ)_/¯</span>
      <h1 data-testid="title">404 Not Found</h1>
      <p>Uh oh! The page you're looking for doesn't exist!</p>
      <BackButton to="/">Back to home</BackButton>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  span {
    font-size: 4rem;
  }

  h1 {
    font-size: 3rem;
    color: tomato;
  }

  p {
    font-size: 1.5rem;
  }
`;

const BackButton = styled(Link)`
  padding: 4px 8px;
  border-radius: 5px;
  background: yellow;
  color: tomato;
  font-weight: bold;
  text-decoration: none;
`;

export default NotFound;
