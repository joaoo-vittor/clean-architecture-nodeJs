const { MongoClient } = require('mongodb')
const env = require('../../main/config/env')

module.exports = {
  async connect () {
    this.client = await MongoClient.connect(env.mongoURL, { useUnifiedTopology: true })
    this.db = await this.client.db()
  },

  async disconnect () {
    await this.client.close()
  },

  async getCollection (name) {
    return this.db.collection(name)
  }
}
