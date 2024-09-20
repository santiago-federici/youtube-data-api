const cors = require('cors')

const ACCEPTED_ORIGINS = [
  'http://localhost:4200',
  'http://localhost:1234',
]

const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not Allowed by CORS'))
  }
})

module.exports = { corsMiddleware }
