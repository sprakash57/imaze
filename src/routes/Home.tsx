import styled from '@emotion/styled';
import MasonryGrid from '@/components/MasonryGrid';

const Home = () => {
  return (
    <Container>
      <MasonryGrid />
    </Container>
  );
};

const Container = styled.div`
  max-width: 90%;
  margin: 20px auto;
`;

export default Home;
