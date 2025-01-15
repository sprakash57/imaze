import styled from 'styled-components';
import MasonryGrid from '@/components/MasonryGrid';

const Container = styled.div`
  max-width: 90%;
  margin: 20px auto;
`;

const Home = () => {
  return (
    <Container>
      <MasonryGrid />
    </Container>
  );
};

export default Home;
