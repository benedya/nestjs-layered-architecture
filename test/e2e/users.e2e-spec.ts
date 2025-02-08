import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST users`, () => {
    const randomNumber = Date.now();

    return request(app.getHttpServer())
      .post('/api/users')
      .send({
        name: `John Doe (${randomNumber})`,
        email: `john.doe.${randomNumber}@example.com`,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('uuid');
        expect(res.body.name).toBe(`John Doe (${randomNumber})`);
        expect(res.body.email).toBe(`john.doe.${randomNumber}@example.com`);
      });
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer()).get('/api/users').expect(200);
  });

  it(`/GET users/:uuid`, async () => {
    const randomNumber = Date.now();

    // Create a new user
    const createUserResponse = await request(app.getHttpServer())
      .post('/api/users')
      .send({
        name: `John Doe (${randomNumber})`,
        email: `john.doe.${randomNumber}@example.com`,
      })
      .expect(201);

    const uuid = createUserResponse.body.uuid;

    // Fetch the user by UUID
    return request(app.getHttpServer())
      .get(`/api/users/${uuid}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('uuid', uuid);
        expect(res.body.name).toBe(`John Doe (${randomNumber})`);
        expect(res.body.email).toBe(`john.doe.${randomNumber}@example.com`);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
