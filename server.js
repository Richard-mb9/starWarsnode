const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')

const planetas = require('./src/controllers/planetas')


const port = 3000;
const host = '0.0.0.0';

const server = express();

server.use(cors())
server.use(bodyparser.json())
server.use(planetas)


server.listen(port,host)



