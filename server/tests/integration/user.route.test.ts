import supertest from 'supertest'
import app from '../../src/app'
import server from '../../src/server'
import mongoose from 'mongoose'

describe('User Routes', () => {
  afterAll((done) => {
    mongoose.connection.close()
    server.close(done) // Close the server when done
  })

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const response = await supertest(app).post('/api/user/register').send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('token')
    })
  })

  describe('POST /login', () => {
    it('should log in a user', async () => {
      const response = await supertest(app).post('/api/user/login').send({
        email: 'testuser@example.com',
        password: 'password123',
      })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('token')
    })
  })
})
