import { describe } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PhotoDetail from '@/routes/PhotoDetail';
import { MemoryRouter, Route, Routes } from 'react-router';

describe('PhotoDetail', () => {
  it('should render PhotoDetail when loading is false', async () => {
    const { queryByAltText } = render(
      <MemoryRouter initialEntries={['/imaze/30228641']}>
        <Routes>
          <Route path="/imaze/:id" element={<PhotoDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(queryByAltText('A sunset over the ocean')).toBeInTheDocument();
    });
  });

  it('should render error message when loading fails', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/imaze/invalid-id']}>
        <Routes>
          <Route path="/imaze/:id" element={<PhotoDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => expect(getByText('Something went wrong')).toBeInTheDocument());
  });

  it('should navigate back when back button is clicked', async () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/imaze/30228641']}>
        <Routes>
          <Route path="/imaze/:id" element={<PhotoDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    const backButton = getByRole('button');
    fireEvent.click(backButton);

    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });
});
