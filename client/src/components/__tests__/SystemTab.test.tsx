import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import SystemTab from '../SystemTab';

// Mock the components to isolate SystemTab testing
vi.mock('../TabbedInterface', () => ({
  default: ({ tabs }: { tabs: any[] }) => (
    <div data-testid="nested-tabbed-interface">
      {tabs.map((tab, index) => (
        <div key={index} data-testid={`system-tab-${tab.namespace}`}>
          {tab.title}
        </div>
      ))}
    </div>
  )
}));

vi.mock('../DebugPanel', () => ({
  default: () => <div data-testid="debug-panel">Debug Panel</div>
}));

vi.mock('../ControlPanel', () => ({
  default: () => <div data-testid="control-panel">Control Panel</div>
}));

vi.mock('../AnalyticsPanel', () => ({
  default: () => <div data-testid="analytics-panel">Analytics Panel</div>
}));

vi.mock('../SettingsPanel', () => ({
  default: () => <div data-testid="settings-panel">Settings Panel</div>
}));

vi.mock('../ReportsPanel', () => ({
  default: () => <div data-testid="reports-panel">Reports Panel</div>
}));

describe('SystemTab', () => {
  test('renders system header with namespace', () => {
    render(<SystemTab namespace="test-system" />);

    expect(screen.getByText('System: test-system')).toBeInTheDocument();
    expect(screen.getByText('Manage system operations and monitoring')).toBeInTheDocument();
  });

  test('renders nested TabbedInterface with default system tabs', () => {
    render(<SystemTab namespace="test-system" />);

    expect(screen.getByTestId('nested-tabbed-interface')).toBeInTheDocument();

    // Verify all default system tabs are rendered with prefixed namespaces
    expect(screen.getByTestId('system-tab-test-system-debug')).toBeInTheDocument();
    expect(screen.getByTestId('system-tab-test-system-control')).toBeInTheDocument();
    expect(screen.getByTestId('system-tab-test-system-analytics')).toBeInTheDocument();
    expect(screen.getByTestId('system-tab-test-system-settings')).toBeInTheDocument();
    expect(screen.getByTestId('system-tab-test-system-reports')).toBeInTheDocument();

    // Verify tab titles
    expect(screen.getByText('Debug')).toBeInTheDocument();
    expect(screen.getByText('Control Panel')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  test('applies cyberpunk styling', () => {
    const { container } = render(<SystemTab namespace="test-system" />);

    // Check for cyberpunk styling (dark background, green text)
    const header = container.querySelector('h3');
    expect(header).toHaveStyle({ color: '#00FF00' });

    const description = container.querySelector('p');
    expect(description).toHaveStyle({ color: '#00FF00' });
  });

  test('supports custom children tabs', () => {
    const customTabs = [
      { namespace: 'custom-debug', title: 'Custom Debug', component: () => null },
      { namespace: 'custom-control', title: 'Custom Control', component: () => null },
    ];

    render(<SystemTab namespace="test-system" children={customTabs} />);

    // Should render custom tabs instead of default ones
    expect(screen.getByTestId('system-tab-custom-debug')).toBeInTheDocument();
    expect(screen.getByTestId('system-tab-custom-control')).toBeInTheDocument();
    expect(screen.getByText('Custom Debug')).toBeInTheDocument();
    expect(screen.getByText('Custom Control')).toBeInTheDocument();
  });

  test('maintains proper layout structure', () => {
    const { container } = render(<SystemTab namespace="test-system" />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveStyle({
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    });
  });
});