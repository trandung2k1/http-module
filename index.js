require('dotenv').config();
const finalhandler = require('finalhandler');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const http = require('http');
const Router = require('router');
const port = process.env.PORT || 3000;
const router = Router();
const userRouter = Router();

const users = userRouter.route('/users');
const user = userRouter.route('/users/:id');

users.get(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Get all userss!'));
});

users.post(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Add user!'));
});

user.get(function (req, res) {
    // console.log(req.params);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify('Get user!'));
});
router.use('/api/', userRouter);
router.use(compression());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(morgan('combined'));

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
    // Stack trace
    console.error(err.stack);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
        JSON.stringify({
            message: '500 Internal Server Error',
        }),
    );
});

const server = http.createServer(function (req, res) {
    router(req, res, finalhandler(req, res));
});

server
    .listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    })
    .on('error', (e) => {
        console.log(e);
        process.exit(1);
    });
