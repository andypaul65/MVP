import { vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import TabbedInterface from '../TabbedInterface';
import type { TabConfig } from '@/types/TabConfig';

// Mock components for tabs
const MockComponent1: React.FC = () => <div>Component 1</div>;
const MockComponent2: React.FC = () => <div>Component 2</div>;

describe('TabbedInterface', () => {
  const mockOnTabMount = vi.fn();

  const tabs: TabConfig[] = [
    {
      namespace: 'tab1',
      title: 'Tab 1',
      component: MockComponent1,
      onTabMount: mockOnTabMount,
    },
    {
      namespace: 'tab2',
      title: 'Tab 2',
      component: MockComponent2,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders tabs correctly', () => {
    render(<TabbedInterface tabs={tabs} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  test('renders first tab content by default', () => {
    render(<TabbedInterface tabs={tabs} />);
    expect(screen.getByText('Component 1')).toBeInTheDocument();
    expect(screen.queryByText('Component 2')).not.toBeInTheDocument();
  });

  test('switches tabs on click', () => {
    render(<TabbedInterface tabs={tabs} />);
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Component 2')).toBeInTheDocument();
    expect(screen.queryByText('Component 1')).not.toBeInTheDocument();
  });

  test('applies active class to active tab', () => {
    render(<TabbedInterface tabs={tabs} />);
    const tab1 = screen.getByText('Tab 1');
    const tab2 = screen.getByText('Tab 2');

    expect(tab1).toHaveClass('active-green');
    expect(tab2).not.toHaveClass('active-green');

    fireEvent.click(tab2);
    expect(tab2).toHaveClass('active-green');
    expect(tab1).not.toHaveClass('active-green');
  });

  test('calls onTabMount when tab becomes active', () => {
    render(<TabbedInterface tabs={tabs} />);
    expect(mockOnTabMount).toHaveBeenCalledTimes(1); // Initial mount

    fireEvent.click(screen.getByText('Tab 2'));
    expect(mockOnTabMount).toHaveBeenCalledTimes(1); // Not called again since tab2 has no onTabMount

    fireEvent.click(screen.getByText('Tab 1'));
    expect(mockOnTabMount).toHaveBeenCalledTimes(2); // Called again when switching back
  });

  test('applies cyberpunk theme classes', () => {
    render(<TabbedInterface tabs={tabs} />);
    const container = screen.getByText('Component 1').closest('.cyberpunk-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('cyberpunk-container');

    const tabsList = container!.querySelector('.cyberpunk-tabs');
    expect(tabsList).toBeInTheDocument();

    const content = container!.querySelector('.cyberpunk-content');
    expect(content).toBeInTheDocument();
  });

  test('applies optional style to content', () => {
    const styledTabs: TabConfig[] = [
      {
        ...tabs[0],
        style: { backgroundColor: 'red' },
      },
    ];
    render(<TabbedInterface tabs={styledTabs} />);
    const content = screen.getByText('Component 1').closest('.cyberpunk-content');
    expect(content).toHaveStyle('background-color: rgb(255, 0, 0);');
  });
});