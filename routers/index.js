/*
 * router内处理路由接口
 *
 */

const userRouter = require('./user');
const articleRouter = require('./article')
const categoryRouter = require('./category')
const roleRouter = require('./role')

const useRouter = function (app) {
  app.use('/user', userRouter)
  app.use('/article', articleRouter)
  app.use('/category', categoryRouter)
  app.use('/role', roleRouter)
}

module.exports = useRouter