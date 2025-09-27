import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import LoginPanel from '../LoginPanel';
import { AuthProvider } from '@/contexts/AuthContext';
import { apiService } from '@/services/apiService';

// Mock the CSS import
vi.mock('../cyberpunk.css', () => ({}));

// Mock apiService
vi.mock('@/services/apiService', () => ({
  apiService: {
    login: vi.fn(() => Promise.resolve({})),
    logout: vi.fn(() => Promise.resolve()),
    getMe: vi.fn(() => Promise.resolve(null)),
  },
}));

describe('LoginPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('renders login form when not authenticated', () => {
    render(
      <AuthProvider>
        <LoginPanel />
      </AuthProvider>
    );

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('shows welcome message when authenticated', async () => {
    (apiService.login as any).mockResolvedValue({
      token: 'token',
      user: { id: 1, username: 'user@example.com', name: 'Demo User' }
    });

    render(
      <AuthProvider>
        <LoginPanel />
      </AuthProvider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Welcome, Demo User')).toBeInTheDocument();
    });

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();
  });

  test('shows error on invalid login', async () => {
    (apiService.login as any).mockRejectedValue(new Error('Login failed'));

    render(
      <AuthProvider>
        <LoginPanel />
      </AuthProvider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Login failed')).toBeInTheDocument();
    });
  });
});