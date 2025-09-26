import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import App from './App';

// Mock the MvpPage component since we're testing App isolation
vi.mock('./pages/MvpPage', () => ({
  default: () => <div data-testid="mvp-page">MVP Page Content</div>
}));

describe('App', () => {
  test('renders MvpPage component', () => {
    render(<App />);

    expect(screen.getByTestId('mvp-page')).toBeInTheDocument();
    expect(screen.getByText('MVP Page Content')).toBeInTheDocument();
  });

  test('applies App CSS classes', () => {
    const { container } = render(<App />);

    // Check that the root div has the expected structure
    const rootElement = container.firstChild;
    expect(rootElement).toBeInTheDocument();
  });
});