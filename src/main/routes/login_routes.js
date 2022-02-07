const loginRouter = require('../composers/login-router-composer')
const expressRouterAdpter = require('../adpters/express-router-adpter')

module.exports = (router) => {
  router.post('/login', expressRouterAdpter.adapt(loginRouter))
}
