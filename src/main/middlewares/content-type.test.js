const request = require('supertest')
const app = require('../config/app')

describe('Content Type Middleware', () => {
  it('should returns json content type as default', async () => {
    app.get('/test_content_type', (req, res) => {
      return res.send({})
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})