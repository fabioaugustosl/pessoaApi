var mongoose = require('mongoose'), Schema = mongoose.Schema;

var enderecoPessoaModel = new Schema({
	idPessoa:{type:String},
	logradouro:{ type:String},
	numero:{ type:String},
	complemento:{ type:String},
	bairro:{ type:String},
	cep:{ type:String},
	cidade:{ type:String},
	estado:{ type:String},
	descricao:{ type:String}
});

module.exports = mongoose.model('EnderecoPessoa', enderecoPessoaModel);