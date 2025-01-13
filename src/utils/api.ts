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

export default async function getCuratedPhotos(
  page: number = 1,
  perPage: number = 15,
): Promise<GetCuratedPhotosResponse> {
  const response = await fetch(`${import.meta.env.VITE_PEXELS_API_URL}/curated?page=${page}&per_page=${perPage}`, {
    headers: {
      Authorization: import.meta.env.VITE_PEXELS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }

  const data: GetCuratedPhotosResponse = await response.json();

  return data;
}
