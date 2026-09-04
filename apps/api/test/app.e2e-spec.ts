import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/setup-app';

describe('Health endpoint', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/health', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/health').expect(200);

    expect(response.body).toMatchObject({
      status: 'ok',
      service: 'pasa-a-paso-api',
      version: 'v1',
    });
    expect(response.body.gpsProvider).toBeDefined();
    expect(response.body.timestamp).toEqual(expect.any(String));
  });
});
