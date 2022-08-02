const axios = require('axios').default;
const jwt = require('jsonwebtoken');
const  { createClient } = require('redis');
const { isStringSemNumero } = require('../utils/utils');
require('dotenv').config();

module.exports = {
	// eslint-disable-next-line no-unused-vars
	index(req, res){
		const { user, password } = req.body; //Recebe dados de usuário e senha via req.body
		
		if(!user || !password)
			return res.json({ auth: false, error: 'Usuário e Senha São Obrigatórios. Tente Novamente.' });
    
		if(user === 'egadnet' && password === 'admin'){ //Usuário e senha fixos, apenas para demonstrar o JWT
			const token = jwt.sign({ userId: 1 }, process.env.SECRET_JWT, { expiresIn: 360 });
			return res.json({ auth: true, token });
		}

		return res.status(401).json({ auth: false, error: 'Usuário/Senha inválido(s) '});
	},
	async buscaCEP(req, res){
		const { cep } = req.body;

		//Validações para consistência da requisição.
		if (!cep) 
			return res.status(400).json({error: 'Por favor, informe o CEP.'});
		if (cep.length !== 8) 
			return res.status(400).json({error: 'O CEP a ser buscado deve conter 8 dígitos, sendo todos numéricos. Tente Novamente!'});
		if (cep.indexOf(' ') > 0) 
			return res.status(400).json({error: 'CEP a ser buscado não pode conter espaços. Tente Novamente!'});
		if (!isStringSemNumero(cep)) 
			return res.status(400).json({error: 'O CEP a ser buscado deve conter somente numéricos. Tente Novamente!'});

		//Instanciar e conectar o Redis Client
		const redisClient = createClient();
		redisClient.on('error', (err) => console.log('Redis Client Error', err));
		await redisClient.connect();
    
		//Verifica se o CEP filtrado está dentro do Redis
		const retornoRedis = await redisClient.get(`CEP-${cep}`);

		const cepData = JSON.parse(retornoRedis);
		if (cepData){
			cepData.origemRetorno = 'CACHE'; //Indica que o retorno é pelo cache
			await redisClient.expire(`CEP-${cep}`, 300); //Seta novamente 5 minutos para a expiração da chave
			return res.status(200).json(cepData);
		}

		try{
			//Caso não esteja em cache, é consultado o cep direto na API
			let retornoViaCEP = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
			if (retornoViaCEP.data.erro) 
				return res.status(400).json({ error: 'CEP informado não foi encontrado. Tente Novamente!' });
      
			retornoViaCEP.data.origemRetorno = 'API VIACEP'; //Indica que o retorno é via API
			await redisClient.set(`CEP-${cep}`, JSON.stringify(retornoViaCEP.data));
			await redisClient.expire(`CEP-${cep}`, 300); //Seta 5 minutos para a expiração da chave

			return res.status(200).json(retornoViaCEP.data);
		}catch (e){
			return res.status(400).json({ error: 'CEP informado não foi encontrado. Tente Novamente!' });
		}
	}
};