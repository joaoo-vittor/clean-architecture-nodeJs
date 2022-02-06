const request = require('supertest')
const app = require('../config/app')

describe('CORS Middleware', () => {
  it('should enable CORS', async () => {
    app.get('/test_x_powered_by', (req, res) => {
      return res.send('')
    })
    const res = await request(app).get('/test_x_powered_by')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
