module.exports = {
  mongoURL: process.env.MONGO_URL || 'mongodb+srv://root:prNl9dfkLXYZcgKt@cluster0.hozmf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  tokenSecret: process.env.TOKEN_SECRET || 'secret'
}
