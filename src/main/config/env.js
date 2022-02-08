module.exports = {
  mongoURL: 'mongodb+srv://root:JdSQzBwKCAMM7VNr@cluster0.hozmf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  port: process.env.PORT || 5858
}
