require('dotenv').config();
const finalhandler = require('finalhandler');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const http = require('http');
const Router = require('router');
const { StatusCodes } = require('http-status-codes');
const colors = require('colors');
const routes = require('./routes');
const connectDB = require('./config/mongo');
const port = process.env.PORT || 3000;

const startServer = () => {
    const router = Router();
    router.use(compression());
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(morgan('combined'));

    routes(router);
    router.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });

    router.use((req, res) => {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(
            JSON.stringify({
                message: 'Route not found',
                path: req.url,
            }),
        );
    });

    // Error-handling middleware
    router.use((err, req, res, next) => {
        if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        const responseError = {
            statusCode: err.statusCode,
            message: err.message || StatusCodes[err.statusCode],
            stack: err.stack,
            errors: err.errors,
        };
        if (process.env.BUILD_MODE !== 'dev') delete responseError.stack;
        res.writeHead(responseError.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseError));
    });

    const server = http.createServer(function (req, res) {
        router(req, res, finalhandler(req, res));
    });

    server
        .listen(port, () => {
            console.log(colors.blue(`Server listening on http://localhost:${port}`));
        })
        .on('error', (e) => {
            console.log(e);
            process.exit(1);
        });
};

(async () => {
    try {
        await connectDB();
        startServer();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
