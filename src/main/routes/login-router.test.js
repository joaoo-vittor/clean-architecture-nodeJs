const request = require('supertest')
const bcrypt = require('bcrypt')
const MongoHelper = require('../../infra/helpers/mongo-helper')
const app = require('../config/app')
let userModel

describe('Login Routes', () => {
  jest.setTimeout(3000)

  beforeAll(async () => {
    await MongoHelper.connect()
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should return 200 when valid credentials are provided', async () => {
    await userModel.insertOne({
      email: 'valid_email@email.com',
      password: bcrypt.hashSync('hashed_password', 10)
    })
    await request(app)
      .post('/api/login')
      .send({
        email: 'valid_email@email.com',
        password: 'hashed_password'
      })
      .expect(200)
  })

  it('Should return 200 when valid credentials are provided', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'valid_email@email.com',
        password: 'hashed_password'
      })
      .expect(401)
  })
})
