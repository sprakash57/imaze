import { renderHook, waitFor } from '@/test/test-utils';
import { describe, it, vi } from 'vitest';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

describe('useInfiniteScroll', () => {
  let mockTargetRef: React.RefObject<HTMLDivElement | null>;

  const mockIntersectionObserver = vi.fn().mockImplementation(callback => ({
    observe: vi.fn(element => {
      if (element === mockTargetRef.current) {
        callback([{ isIntersecting: true, target: element }]);
      }
    }),
    disconnect: vi.fn(),
  }));

  beforeEach(() => {
    mockTargetRef = { current: document.createElement('div') };
    global.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call fetchData and receive mocked data', async () => {
    let page = 0;
    const fetchData = vi.fn(() =>
      fetch('https://api.pexels.com/v1/curated?page=1&per_page=20')
        .then(res => res.json())
        .then(data => {
          page = data.page;
        }),
    );

    renderHook(() => useInfiniteScroll({ fetchData, targetRef: mockTargetRef }));
    expect(fetchData).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(page).toBe(1));
  });

  it('should clean up IntersectionObserver on unmount', () => {
    const { unmount } = renderHook(() => useInfiniteScroll({ fetchData: vi.fn(), targetRef: mockTargetRef }));

    unmount();

    const mockDisconnect = mockIntersectionObserver.mock.results[0].value.disconnect;
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
