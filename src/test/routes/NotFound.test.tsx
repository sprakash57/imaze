import { describe } from 'vitest';
import { render, fireEvent, waitFor } from '@/test/test-utils';
import NotFound from '@/routes/NotFound';

describe('NotFound', () => {
  it('should render NotFound page for unknown routes', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('404 Not Found')).toBeInTheDocument();
  });

  it('renders "Back to home" link', () => {
    const { getByText } = render(<NotFound />);

    expect(getByText('Back to home')).toBeInTheDocument();
  });

  it('should navigate to home page when "Back to home" is clicked', async () => {
    const { getByText } = render(<NotFound />);

    const backButton = getByText('Back to home');
    fireEvent.click(backButton);

    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });
});
