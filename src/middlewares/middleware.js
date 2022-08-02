const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
	verifyJWT(req, res, next){
		const token = req.headers['x-access-token']; //Recebe o token do header.
		// eslint-disable-next-line no-unused-vars
		jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => { //Verifica se o token é válido
			if(err) 
				return res.status(401).json({ error: 'Token inválido!'});

			//Caso o token for válido, passa para a próxima função da requisição.
			next();
		});
	}
};