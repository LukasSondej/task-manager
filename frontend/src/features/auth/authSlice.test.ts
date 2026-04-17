import { describe, it, expect, vi } from 'vitest';

vi.hoisted(() => {
  globalThis.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
  } as any;
});

import authReducer, { logout } from './authSlice';

describe('Auth Tests', () => {
    it('checks initial unauthenticated state', () => {
        const state = authReducer(undefined, { type: 'unknown' });
        expect(state.isAuthenticated).toBe(false);
    });

    it('checks logout action', () => {
        const loggedInState = {
            token: "123",
            isAuthenticated: true,
            isLoading: false,
            isError: false
        };
        const newState = authReducer(loggedInState, logout());
        expect(newState.isAuthenticated).toBe(false);
    });
});