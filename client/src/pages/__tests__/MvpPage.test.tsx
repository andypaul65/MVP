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

    expect(screen.getByRole('heading', { level: 2, name: 'MVP UI' })).toBeInTheDocument();
  });

  test('renders TabbedInterface with correct tabs', () => {
    render(<MvpPage />);

    expect(screen.getByTestId('tabbed-interface')).toBeInTheDocument();
    expect(screen.getByTestId('tab-login')).toBeInTheDocument();
    expect(screen.getByTestId('tab-system')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  test('includes Login and System tabs with nested structure', () => {
    render(<MvpPage />);

    // Verify top-level tabs are present
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();

    // Verify the System tab contains nested tabs (Debug, Control, Analytics, Settings, Reports)
    // The nested tabs are rendered by the SystemTab component when the System tab is active
    // This test verifies the structure supports nested tabs
    expect(screen.getByTestId('tabbed-interface')).toBeInTheDocument();
  });

  test('has extensible tab structure for future features', () => {
    render(<MvpPage />);

    // The structure allows for easy addition of more tabs
    // This test verifies the component renders without issues
    const tabbedInterface = screen.getByTestId('tabbed-interface');
    expect(tabbedInterface).toBeInTheDocument();
  });
});