const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class LoadUserByEmailRepository {
  async load (email) {
    if (!email) {
      throw new MissingParamError('email')
    }
    await MongoHelper.connect()
    const db = await MongoHelper.db
    const user = await db.collection('users').findOne(
      { email },
      {
        projection: {
          password: 1
        }
      }
    )

    await MongoHelper.disconnect()
    return user
  }
}
