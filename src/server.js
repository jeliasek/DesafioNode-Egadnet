const express = require('express');
const routes = require('./routes/routes');
const app = express();
app.use(express.json());
app.use(routes);
app.timeout = 100000;

app.listen(3333, function(){
	console.log('Servidor está rodando na porta: 3333');
});
