import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/setup-app';

describe('Health endpoint', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.GPS_PROVIDER = 'demo';
    process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/pasa_a_paso?schema=public';
    process.env.REALTIME_DEV_AUTH_TOKEN = 'test-token';
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
      gpsProvider: 'DEMO',
    });
    expect(response.body.timestamp).toEqual(expect.any(String));
  });
});
