const userRouter = require('./user.route');
const routes = (router) => {
    router.use('/api/', userRouter);
};

module.exports = routes;
