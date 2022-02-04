
class TokenGenerator {
  async generate (id) {
    return null
  }
}

describe('Token Generator', () => {
  it('Should return null if JWT retuns null', async () => {
    const sut = new TokenGenerator()
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })
})
