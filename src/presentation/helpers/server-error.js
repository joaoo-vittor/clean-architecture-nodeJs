module.exports = class UnauthorizedError extends Error {
  constructor () {
    super('Internal Error')
    this.name = 'ServerError'
  }
}
