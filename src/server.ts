import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json()) // For parsing application/json

// Connect to MongoDB
const DB_URI = process.env.DB_URI || 'your_default_mongodb_connection_string'
mongoose
  .connect(DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err))

// Sample Route
app.get('/', (req, res) => {
  res.send('Hello, Skill Sync!')
})

// Start the Express Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
