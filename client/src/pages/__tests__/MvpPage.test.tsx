import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import MvpPage from '../MvpPage';

// Mock the components to isolate MvpPage testing
vi.mock('@/components/TabbedInterface', () => ({
  default: ({ tabs }: { tabs: any[] }) => (
    <div data-testid="tabbed-interface">
      {tabs.map((tab, index) => (
        <div key={index} data-testid={`tab-${tab.namespace}`}>
          {tab.title}
        </div>
      ))}
    </div>
  )
}));

vi.mock('@/components/DebugPanel', () => ({
  default: () => <div data-testid="debug-panel">Debug Panel</div>
}));

vi.mock('@/components/ControlPanel', () => ({
  default: () => <div data-testid="control-panel">Control Panel</div>
}));

describe('MvpPage', () => {
  test('renders MVP UI title', () => {
    render(<MvpPage />);

    expect(screen.getByText('MVP UI')).toBeInTheDocument();
  });

  test('renders TabbedInterface with correct tabs', () => {
    render(<MvpPage />);

    expect(screen.getByTestId('tabbed-interface')).toBeInTheDocument();
    expect(screen.getByTestId('tab-debug')).toBeInTheDocument();
    expect(screen.getByTestId('tab-control')).toBeInTheDocument();
    expect(screen.getByText('Debug')).toBeInTheDocument();
    expect(screen.getByText('Control Panel')).toBeInTheDocument();
  });

  test('includes debug and control panel tabs', () => {
    render(<MvpPage />);

    // Verify both tabs are present
    expect(screen.getByText('Debug')).toBeInTheDocument();
    expect(screen.getByText('Control Panel')).toBeInTheDocument();
  });

  test('has extensible tab structure for future features', () => {
    render(<MvpPage />);

    // The structure allows for easy addition of more tabs
    // This test verifies the component renders without issues
    const tabbedInterface = screen.getByTestId('tabbed-interface');
    expect(tabbedInterface).toBeInTheDocument();
  });
});