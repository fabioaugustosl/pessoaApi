var mongoose = require('mongoose'), Schema = mongoose.Schema;

var pessoaModel = new Schema({
	dono: {type:String},
	id: {type:String},
	imgDestaque :{type: String},
	nome:{ type:String},
	sobrenome: {type: String},
	dataNascimento:{ type: Date},
	cpf: {type: String},
	rg: {type: String},
	documento_extra1: {type: String},
	documento_extra2: {type: String},
	documento_extra3: {type: String},
	info_extra1: {type: String},
	info_extra2: {type: String},
	info_extra3: {type: String},
	sexo:{ type: String},
	nomeMae:{type:String},
	matricula :{type:String}, 
	estadoCivil: {type:String},
	email: {type:String},
	telefone: {type:String},
	celular: {type:String},
	login: {type:String},
	senha: {type:String},
	perfil: {type:String},
	dataCriacao:{ type: Date, default: Date.now },
	ativo:{type:Boolean, default: true}
});

module.exports = mongoose.model('Pessoa', pessoaModel);