const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError } = require('../../utils/errors')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    if (!userId) {
      throw new MissingParamError('userId')
    }
    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }
    await this.userModel.updateOne(
      {
        _id: userId
      },
      {
        $set: {
          accessToken
        }
      }
    )
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@email.com',
      name: 'any_name',
      age: 50,
      atate: 'any_state',
      password: 'hashed_password'
    })
    await sut.update(fakeUser.insertedId, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id: fakeUser.insertedId })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  it('should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const userModel = db.collection('users')
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@email.com',
      name: 'any_name',
      age: 50,
      atate: 'any_state',
      password: 'hashed_password'
    })
    const promise = sut.update(fakeUser.insertedId, 'valid_token')
    expect(promise).rejects.toThrow()
  })

  it('should throw if no params are provided', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@email.com',
      name: 'any_name',
      age: 50,
      atate: 'any_state',
      password: 'hashed_password'
    })
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(fakeUser.insertedId)).rejects
      .toThrow(new MissingParamError('accessToken'))
  })
})
