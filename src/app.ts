import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerDefinition from '../swaggerDefinition'

import userRoutes from './routes/user.route'

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json()) // For parsing application/json

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['./src/docs/*.yaml'],
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/api/users', userRoutes)

// Sample Route
app.get('/', (req, res) => {
  res.send('Hello, Skill Sync!')
})

// Connect to MongoDB
const DB_URI = process.env.DB_URI || 'your_default_mongodb_connection_string'
mongoose
  .connect(DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err))

export default app
