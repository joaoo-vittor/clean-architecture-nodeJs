class EmailValidator {
  isValid () {
    return true
  }
}

describe('Email Validator', () => {
  it('Should return trueif validator returns true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@email.com')
    expect(isEmailValid).toBe(true)
  })
})
