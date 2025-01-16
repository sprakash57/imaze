import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { CuratedPhoto, getCuratedPhotos } from '@/utils/api';

const MasonryGrid = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<CuratedPhoto[]>([]);
  const [nextPage, setNextPage] = useState<string>('1');
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const uniquePhotosRef = useRef(new Set());

  const getUniquePhotos = (photos: CuratedPhoto[]) => {
    const uniquePhotos = photos.filter(({ id }) => !uniquePhotosRef.current.has(id));
    uniquePhotosRef.current = new Set([...uniquePhotosRef.current, ...uniquePhotos.map(({ id }) => id)]);
    return uniquePhotos;
  };

  const getPhotos = useCallback(async () => {
    const { photos: newPhotos, next_page } = await getCuratedPhotos({ pageParam: nextPage });
    const uniquePhotos = getUniquePhotos(newPhotos);
    setPhotos(prevPhotos => [...prevPhotos, ...uniquePhotos]);
    setNextPage(next_page);
  }, [nextPage]);

  const handlePhotoClick = (id: number) => {
    navigate(`/imaze/${id}`);
  };

  useInfiniteScroll({ fetchData: getPhotos, targetRef: loadMoreRef });

  return (
    <>
      <ImageContainer ref={containerRef} data-testid="masonry-grid" role="list" aria-label="list of photos">
        {photos.map(photo => (
          <img
            key={photo.id}
            src={photo.src.medium}
            alt={photo.alt}
            onClick={() => handlePhotoClick(photo.id)}
            tabIndex={0}
            role="listitem"
            aria-label={photo.alt}
          />
        ))}
      </ImageContainer>
      {nextPage && <div ref={loadMoreRef} />}
    </>
  );
};

const ImageContainer = styled.div`
  columns: 4 180px;
  gap: 20px;

  img {
    margin-bottom: 10px;
    border-radius: 5px;
    width: 100%;
    cursor: zoom-in;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 768px) {
    columns: 2 180px;
  }

  @media (max-width: 480px) {
    columns: 1 180px;
  }
`;

export default MasonryGrid;
