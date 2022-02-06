const request = require('supertest')

describe('Content Type Middleware', () => {
  let app
  beforeEach(() => {
    jest.resetModules()
    app = require('../config/app')
  })

  it('should returns json content type as default', async () => {
    app.get('/test_content_type', (req, res) => {
      return res.send({})
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  it('should returns xml content type if forced', async () => {
    app.get('/test_content_type', (req, res) => {
      res.type('xml')
      return res.send('')
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /xml/)
  })
})
