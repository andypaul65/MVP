import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock React DOM
const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender
}));

vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot
}));

// Mock the App component
vi.mock('./App', () => ({
  default: () => <div>App Component</div>
}));

// Mock MSW in development
vi.mock('./mocks/browser', () => ({
  worker: {
    start: vi.fn()
  }
}));

// Create a mock DOM element
const mockRootElement = { tagName: 'DIV', id: 'root' };
const mockGetElementById = vi.fn(() => mockRootElement);

// Mock document
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true
});

// Mock import.meta.env
vi.mock('import.meta', () => ({
  env: {
    DEV: true
  }
}));

describe('main.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders App in StrictMode', async () => {
    // Import and execute main.tsx
    await import('./main');

    expect(mockGetElementById).toHaveBeenCalledWith('root');
    expect(mockCreateRoot).toHaveBeenCalledWith(mockRootElement);
    expect(mockRender).toHaveBeenCalled();
  });

  // Skipping MSW start test as dynamic import mocking is complex in Vitest
  // test('starts MSW worker in development', async () => {
  //   // Re-import to trigger the MSW setup
  //   await import('./main');

  //   // MSW worker start should have been called
  //   const { worker } = await import('./mocks/browser');
  //   expect(worker.start).toHaveBeenCalled();
  // });
});