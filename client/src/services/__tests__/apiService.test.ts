import { describe, it, expect, beforeEach } from 'vitest';
import { apiService } from '../apiService';
import type { MessageDto } from '@/types/MessageDto';
import type { HeartbeatDto } from '@/types/HeartbeatDto';
import { server } from '../../setupTests';
import { http, HttpResponse } from 'msw';

describe('apiService', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  describe('getState', () => {
    it('should return MessageDto on successful fetch', async () => {
      const mockResponse: MessageDto = { content: 'Test state', namespace: 'test' };
      server.use(
        http.get('http://localhost:8080/api/state/test', () => {
          return HttpResponse.json(mockResponse);
        })
      );

      const result = await apiService.getState('test');

      expect(result).toEqual(mockResponse);
    });

    it('should throw error on failed fetch', async () => {
      server.use(
        http.get('http://localhost:8080/api/state/test', () => {
          return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
        })
      );

      await expect(apiService.getState('test')).rejects.toThrow('Failed to get state: Not Found');
    });
  });

  describe('sendMessage', () => {
    it('should return MessageDto on successful send', async () => {
      const message: MessageDto = { content: 'Test message', namespace: 'test' };
      const mockResponse: MessageDto = { content: 'Processed', namespace: 'test' };
      server.use(
        http.post('http://localhost:8080/api/message/test', () => {
          return HttpResponse.json(mockResponse);
        })
      );

      const result = await apiService.sendMessage('test', message);

      expect(result).toEqual(mockResponse);
    });

    it('should throw error on failed send', async () => {
      const message: MessageDto = { content: 'Test message', namespace: 'test' };
      server.use(
        http.post('http://localhost:8080/api/message/test', () => {
          return new HttpResponse(null, { status: 400, statusText: 'Bad Request' });
        })
      );

      await expect(apiService.sendMessage('test', message)).rejects.toThrow('Failed to send message: Bad Request');
    });
  });

  describe('heartbeat', () => {
    it('should return HeartbeatDto on successful heartbeat', async () => {
      const mockResponse: HeartbeatDto = { status: 'alive', timestamp: '2023-01-01T00:00:00Z' };
      server.use(
        http.get('http://localhost:8080/api/heartbeat', () => {
          return HttpResponse.json(mockResponse);
        })
      );

      const result = await apiService.heartbeat();

      expect(result).toEqual(mockResponse);
    });

    it('should throw error on failed heartbeat', async () => {
      server.use(
        http.get('http://localhost:8080/api/heartbeat', () => {
          return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
        })
      );

      await expect(apiService.heartbeat()).rejects.toThrow('Heartbeat failed: Internal Server Error');
    });
  });
});