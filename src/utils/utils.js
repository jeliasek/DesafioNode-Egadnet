module.exports = {
	isStringSemNumero(string) {
		//Expressão regular que verifica se a String é composta por somente numéricos
		return /^\d+$/.test(string);
	}
};
