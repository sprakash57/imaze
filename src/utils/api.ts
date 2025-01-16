export interface CuratedPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface GetCuratedPhotosResponse {
  page: number;
  per_page: number;
  photos: CuratedPhoto[];
  total_results: number;
  next_page: string;
}

export async function getCuratedPhotos({ pageParam = '1' }: { pageParam: string }): Promise<GetCuratedPhotosResponse> {
  const response = await fetch(`${import.meta.env.VITE_PEXELS_API_URL}/curated?page=${pageParam}&per_page=${50}`, {
    headers: {
      Authorization: import.meta.env.VITE_PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Looks like curated photos are not available at the moment. Please try again later.');
  }

  const data: GetCuratedPhotosResponse = await response.json();

  const nextPageUrl = data.next_page ? new URL(data.next_page) : '';
  const nextPageInUrl = nextPageUrl ? nextPageUrl.searchParams.get('page') : undefined;

  return { ...data, next_page: nextPageInUrl || '' };
}

export async function getPhotoById(id: string) {
  const response = await fetch(`${import.meta.env.VITE_PEXELS_API_URL}/photos/${id}`, {
    headers: {
      Authorization: import.meta.env.VITE_PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Requested photo is not available at the moment. Please try again later.');
  }

  const data = await response.json();
  return data;
}
