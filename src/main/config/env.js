require('dotenv').config()

module.exports = {
  mongoURL: process.env.MONGO_ATLAS_URI,
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  port: process.env.PORT || 5858
}
