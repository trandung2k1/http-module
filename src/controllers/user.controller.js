const { StatusCodes } = require('http-status-codes');
class UserController {
    static async getAllUser(req, res) {
        res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify('Get all userss!'));
    }
    static async createUser(req, res) {
        console.log(req.body);
        res.writeHead(StatusCodes.CREATED, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify('Add user!'));
    }
    static async getUserById(req, res) {
        res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify('Get user!'));
    }
}

module.exports = UserController;
