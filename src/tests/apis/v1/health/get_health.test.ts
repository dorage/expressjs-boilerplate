import { apiClient } from '@/tests/libs/supertest';

describe('GET /health', () => {
  it('응답 확인', async () => {
    const res = await apiClient.get('/v1/health');

    expect(res.status).toEqual(200);
    expect(res.body).toStrictEqual({ okay: true });
  });
});
