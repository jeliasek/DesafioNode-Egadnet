const express = require('express');
const controller = require('../controller/controller');
const { verifyJWT } = require('../middlewares/middleware');

const routes = express.Router();

routes.post('/auth', controller.index);
routes.post('/',verifyJWT, controller.buscaCEP);

module.exports = routes;