const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const isValidId = (req, res, next) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        next();
    } else {
        res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
        res.end(
            JSON.stringify({
                message: 'Invalid id',
            }),
        );
    }
};
module.exports = isValidId;
