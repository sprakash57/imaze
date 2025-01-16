import ArrowReply from '@/assets/icons/ArrowReply';
import { CuratedPhoto, getPhotoById } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import styled from 'styled-components';

const PhotoDetail = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
        console.error(error);
        alert('This image is not available at the moment. Please try later.');
      } finally {
        setLoading(false);
      }
    };

    loadPhotoDetail();
  }, [params.id]);

  return (
    <Container>
      <Content>
        <BackButton role="button" onClick={handleBackNavigation}>
          <ArrowReply size={30} fill="tomato" />
        </BackButton>
        {loading ? (
          <Placeholder />
        ) : (
          <>
            <h1>{photoDetail?.alt}</h1>
            <h4>
              Photo by{' '}
              <a href={photoDetail?.photographer_url} rel="noopener noreferrer" target="_blank">
                {photoDetail?.photographer}
              </a>
            </h4>
            {loading ? <Placeholder /> : <img src={photoDetail?.src.landscape} alt={photoDetail?.alt} />}
            <div>
              Explore at{' '}
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

const Container = styled.div`
  padding: 40px;

  a {
    text-decoration: none;
    padding: 2px 4px;
    background: yellow;
    border-radius: 5px;
    color: tomato;
  }
`;

const BackButton = styled.div`
  align-self: flex-start;
  cursor: pointer;
`;

const Content = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  h1 {
    font-size: 2.2rem;
    text-align: center;
  }

  img {
    margin: 20px 0;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Placeholder = styled.div`
  width: 100%;
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
