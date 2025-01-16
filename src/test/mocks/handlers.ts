import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.pexels.com/v1/photos/30228641', () => {
    return HttpResponse.json(
      {
        id: 30228641,
        url: 'https://www.pexels.com/photo/30228641/',
        photographer: 'Pexels',
        photographer_url: 'https://www.pexels.com/@pexels',
        photographer_id: 0,
        src: {
          landscape:
            'https://images.pexels.com/photos/30228641/pexels-photo-30228641.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        },
        alt: 'A sunset over the ocean',
      },
      { status: 200 },
    );
  }),

  http.get('https://api.pexels.com/v1/photos/invalid-id', () => {
    return HttpResponse.json(null, { status: 404 });
  }),

  http.get('https://api.pexels.com/v1/curated?page=1&per_page=20', () => {
    return HttpResponse.json(
      {
        page: 1,
        per_page: 20,
        photos: [
          {
            id: 30228641,
            url: 'https://www.pexels.com/photo/30228641/',
            photographer: 'Pexels',
            photographer_url: 'https://www.pexels.com/@pexels',
            photographer_id: 0,
            src: {
              landscape:
                'https://images.pexels.com/photos/30228641/pexels-photo-30228641.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
            },
            alt: 'A sunset over the ocean',
          },
        ],
        next_page: '2',
      },
      { status: 200 },
    );
  }),
];
