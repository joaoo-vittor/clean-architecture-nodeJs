const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

MongoHelper.connect(env.mongoURL)
  .then(() => {
    const app = require('./config/app')

    app.listen(5858, () => {
      console.log('Server Running')
      console.log('\nCtrl + Click http://localhost:5858\n')
    })
  })
  .catch(console.error)
