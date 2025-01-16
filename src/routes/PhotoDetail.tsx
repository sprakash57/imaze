import ArrowReply from '@/assets/icons/ArrowReply';
import { CuratedPhoto, getPhotoById } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import styled from '@emotion/styled';

const PhotoDetail = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [photoDetail, setPhotoDetail] = useState<CuratedPhoto | null>(null);

  const handleBackNavigation = () => {
    navigate(-1);
  };

  useEffect(() => {
    const loadPhotoDetail = async () => {
      try {
        setLoading(true);
        const detail = await getPhotoById(params.id as string);
        setPhotoDetail(detail);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadPhotoDetail();
  }, [params.id]);

  return (
    <Container>
      <Content>
        <BackButton role="button" onClick={handleBackNavigation} aria-label="Go Back">
          <ArrowReply size={30} fill="tomato" />
        </BackButton>
        {loading ? (
          <Placeholder aria-label="Loading content" />
        ) : error ? (
          <ErrorSection aria-live="assertive">
            <h1>Something went wrong</h1>
            <h3>{error}</h3>
          </ErrorSection>
        ) : (
          <>
            <h1>{photoDetail?.alt}</h1>
            <h4>
              Photo by{' '}
              <a href={photoDetail?.photographer_url} rel="noopener noreferrer" target="_blank">
                {photoDetail?.photographer}
              </a>
            </h4>
            <ImageWrapper>
              <img src={photoDetail?.src.large} alt={photoDetail?.alt} />
            </ImageWrapper>
            <div>
              Explore in{' '}
              <a href={photoDetail?.url} target="_blank" rel="noopener noreferrer">
                Pexels
              </a>
            </div>
          </>
        )}
      </Content>
    </Container>
  );
};

export default PhotoDetail;

const Container = styled.main`
  padding: 40px;

  a {
    text-decoration: none;
    padding: 2px 4px;
    background: tomato;
    border-radius: 5px;
    color: #242424;
  }
`;

const BackButton = styled.section`
  align-self: flex-start;
  cursor: pointer;
`;

const Content = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  h1 {
    font-size: 2rem;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  max-width: 100%;

  img {
    border-radius: 15px;
    height: auto;
    object-fit: contain;
  }
`;

const ErrorSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Placeholder = styled.section`
  margin-top: 80px;
  width: 450px;
  height: 500px;
  border-radius: 15px;
  background-color: #eee;
  background-image: linear-gradient(to right, #eee 8%, #ddd 18%, #eee 33%);
  background-size: 800px;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  }
`;
