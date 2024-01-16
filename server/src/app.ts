import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import favicon from 'serve-favicon'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerDefinition from '../swaggerDefinition'

import userRoutes from './routes/user.route'
import roadmapRoutes from './routes/roadmap.route'
import contentRoutes from './routes/content.route'
import forumRoutes from './routes/forum.route'
import threadRoutes from './routes/thread.route'
import postRoutes from './routes/post.route'

dotenv.config()

const app = express()

// Middlewares
app.use(favicon('favicon.ico'))
app.use(cors())
app.use(express.json()) // For parsing application/json
app.use(morgan('common'))
app.use(helmet({ referrerPolicy: false }))
app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
)

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['./src/docs/*.yaml'],
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/api/users', userRoutes)
app.use('/api/roadmaps', roadmapRoutes)
app.use('/api/contents', contentRoutes)
app.use('/api/forums', forumRoutes)
app.use('/api/threads', threadRoutes)
app.use('/api/posts', postRoutes)

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
