const LoginRouterComposer = require('../composers/login-router-composer')
const { adapt } = require('../adpters/express-router-adpter')

module.exports = (router) => {
  router.post('/login', adapt(LoginRouterComposer.compose()))
}
