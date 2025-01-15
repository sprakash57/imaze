import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import getCuratedPhotos, { CuratedPhoto } from '@/utils/api';

const ImageContainer = styled.div`
  columns: 6 120px;
  gap: 20px;

  img {
    margin-bottom: 10px;
    border-radius: 5px;
    width: 100%;
  }
`;

const LoadMoreSection = styled.div`
  position: absolute;
  left: 0;
  height: 200px;
`;

const MasonryGrid = () => {
  const navigate = useNavigate();
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

  const handlePhotoClick = (id: number) => {
    navigate(`/imaze/${id}`);
  };

  useInfiniteScroll({ fetchData: getPhotos, targetRef: loadMoreRef });

  return (
    <>
      <ImageContainer>
        {photos.map(photo => (
          <img key={photo.id} src={photo.src.large} alt={photo.alt} onClick={() => handlePhotoClick(photo.id)} />
        ))}
      </ImageContainer>
      {nextPage && <LoadMoreSection ref={loadMoreRef} />}
    </>
  );
};

export default MasonryGrid;
