import { useState, useRef, useCallback } from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import getCuratedPhotos, { CuratedPhoto } from '../utils/api';
import styled from 'styled-components';

const ImageContainer = styled.div`
  columns: 4 180px;
  gap: 20px;

  img {
    margin-bottom: 10px;
    border-radius: 5px;
    width: 100%;
  }
`;

const MasonryGrid = () => {
  const [photos, setPhotos] = useState<CuratedPhoto[]>([]);
  const [nextPage, setNextPage] = useState<number | undefined>(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const uniquePhotosRef = useRef(new Set());

  const getUniquePhotos = (photos: CuratedPhoto[]) => {
    const uniquePhotos = photos.filter(({ id }) => !uniquePhotosRef.current.has(id));
    uniquePhotosRef.current = new Set([...uniquePhotosRef.current, ...uniquePhotos.map(({ id }) => id)]);
    return uniquePhotos;
  };

  const getPhotos = useCallback(async () => {
    const { photos: newPhotos, next_page } = await getCuratedPhotos(nextPage);
    const nextPageUrl = next_page ? new URL(next_page) : '';
    const nextPageInUrl = nextPageUrl ? nextPageUrl.searchParams.get('page') : undefined;
    const uniquePhotos = getUniquePhotos(newPhotos);
    setPhotos(prevPhotos => [...prevPhotos, ...uniquePhotos]);
    setNextPage(nextPageInUrl ? parseInt(nextPageInUrl) : undefined);
  }, [nextPage]);

  useInfiniteScroll({ fetchData: getPhotos, targetRef: loadMoreRef });

  return (
    <>
      <ImageContainer>
        {photos.map(photo => (
          <img key={photo.id} src={photo.src.large} alt={photo.alt} />
        ))}
      </ImageContainer>
      {nextPage && <div ref={loadMoreRef} />}
    </>
  );
};

export default MasonryGrid;
