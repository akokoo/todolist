const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const authConfig = require("./src/auth_config");
const bodyParser = require("body-parser");

dotenv.config();
const server = express();
const port = process.env.SERVER_PORT || '5000';
const appPort = process.env.APP_PORT || '3000';
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

const { db: dbConnection } = require('./db');

const corsOptions = {
    'methods': ['OPTIONS', 'GET', 'POST', 'DELETE', 'PUT'],
    'origin': [appOrigin],
    'allowedHeaders': ['Origin', 'Authorization', 'Content-Type'],
    'maxAge': 60000,
    "optionsSuccessStatus": 200
};
server.use(bodyParser.json());
server.use(helmet());

const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});

/**
 * force wake up the server
 */
server.get('/wakeupheroku', (req, res) => {
    res.status(200).send('OK');
})

server.options('/gettasks', cors(corsOptions));
server.post('/gettasks', checkJwt, cors(corsOptions), (req, res) => {
    const { email } = req.body;
    res.set({
        'Content-Type': 'application/json; charset=utf-8'
    });
    dbConnection.any(`SELECT * from taskslist WHERE email='${email}'`)
        .then(data => res.json(data))
        .catch(err => console.log('err', err));
});

server.options('/addtask', cors(corsOptions));
server.put('/addtask', checkJwt, cors(corsOptions), (req, res) => {
    const { email, task_name, description, id} = req.body;

    dbConnection.tx(t => t.none(
        `INSERT INTO taskslist (email, task_name, description, id, status)
        VALUES ('${email}', '${task_name}', '${description}', '${id}', false)`
            
    ));
    res.send('OK');
});

/**
 * @todo add change stasus
 */
server.options('/edittask', cors(corsOptions));
server.put('/edittask', checkJwt, cors(corsOptions), (req, res) => {
    let { id, task_name, description } = req.body;
    console.log(task_name, description)
    
    dbConnection.any(`UPDATE taskslist
    SET task_name='${task_name}', description='${description}'
    WHERE id='${id}'`);
    res.send('OK');
});

server.options('/deletetask', cors(corsOptions));
server.delete('/deletetask', checkJwt, cors(corsOptions), (req, res) => {
    let { id } = req.body;
    dbConnection.one(`DELETE from taskslist WHERE id='${id}'`);
    res.send('OK');
});

server.listen(port, () => console.log(`server run at http://localhost:${port}`));