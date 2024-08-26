import request from 'supertest'
import app from '../app'
describe('GET /api/v1/tours', () => {
  it.only('should respond with a list of tours', async () => {
    const response = await request(app).get('/api/v1/tours')
    console.log(response)
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
  })

  it('should respond with a list of tours id', async () => {
    const response = await request(app).get('/api/v1/tours/15')
    console.log(response.status)
    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      status: 'fail',
      message: 'Invalid ID',
    })
  })
})
