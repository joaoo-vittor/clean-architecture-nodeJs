const { MissingParamError } = require('../../utils/errors')
const AuthUseCase = require('./auth-usecase')

const makeSut = () => {
  class LoadUserByEmailRepository {
    async load (email) {
      this.email = email
      return this.user
    }
  }

  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepository()
  loadUserByEmailRepositorySpy.user = {}
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy)
  return {
    sut,
    loadUserByEmailRepositorySpy
  }
}

describe('Auth UseCase', () => {
  it('Should throw if no email is provided', () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  it('Should throw if no password is provided', () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_email@email.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  it('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any_email@email.com', 'any_passwod')
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  it('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@email.com', 'any_passwod')
    expect(promise).rejects.toThrow()
  })

  it('Should throw if no LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('any_email@email.com', 'any_passwod')
    expect(promise).rejects.toThrow()
  })

  it('Should return null if an invalid email is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_email@email.com', 'any_passwod')
    expect(accessToken).toBeNull()
  })

  it('Should return null if an invalid password is provided', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('valid_email@email.com', 'invalid_passwod')
    expect(accessToken).toBeNull()
  })
})
