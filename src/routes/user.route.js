const Router = require('router');
const UserController = require('../controllers/user.controller');
const isValidId = require('../middlewares/validateId');
const { createUser } = require('../validations/user.validation');
const userRouter = Router();

const users = userRouter.route('/users');
const user = userRouter.route('/users/:id');

users.get(UserController.getAllUser);
users.post(createUser, UserController.createUser);
user.get(isValidId, UserController.getUserById);

module.exports = userRouter;
