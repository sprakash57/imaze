import { useRef, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  fetchData: () => void;
  targetRef: React.RefObject<Element | null>;
}

const useInfiniteScroll = ({ fetchData, targetRef }: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFetching = useRef(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isFetching.current) {
          isFetching.current = true;
          fetchData();
        }
      });
    },
    [fetchData],
  );

  useEffect(() => {
    if (targetRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      });

      observerRef.current.observe(targetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [targetRef, handleIntersection]);

  useEffect(() => {
    isFetching.current = false;
  }, [fetchData]);

  return;
};

export default useInfiniteScroll;
