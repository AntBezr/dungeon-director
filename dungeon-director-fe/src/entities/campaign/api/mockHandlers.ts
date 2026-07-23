// src/entities/campaign/api/mockHandlers.ts
import { http, HttpResponse } from 'msw';
import { campaignsMock } from '../model/mock';

export const campaignMockHandlers = [
  http.get('/api/campaigns', () => {
    return HttpResponse.json(campaignsMock);
  }),
];