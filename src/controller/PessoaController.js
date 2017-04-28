
var moment = require('moment');
var md5 = require('md5');


var pessoaController = function(pessoaModel){

	var salvarNovo = function(req, res){
		console.log(' ::: Salvar Nova Pessoa');
		var pessoa = new pessoaModel(req.body);
		
		console.log(pessoa);
		var msgObrigatorio = '';
		if(!req.body.dono) {
			msgObrigatorio+= 'Dono é obrigatório.<br/>';
		}
		if(!req.body.nome) {
			msgObrigatorio+= 'Nome é obrigatório.<br/>';
		}

		if(msgObrigatorio != '') {
			res.status(400);
			res.send(msgObrigatorio);
		} else {
			pessoa.dataCriacao = moment().second(0).millisecond(0).utc().format();
			
			if(pessoa.senha){
				pessoa.senha = md5(pessoa.senha);
			}

			if(pessoa.dataNascimento){
				pessoa.dataNascimento = moment().utc(pessoa.dataNascimento).format();	
			}
			
			pessoa.save();
			res.status(201);
			res.send(pessoa);	
		}

	};


	var substituir = function(req, res){
		console.log(' ::: Substituir Pessoa ');
		var pessoa = req.pessoa; // new pessoaModel(req.body);
		console.log(pessoa);

		pessoa.id = req.body.id;
		pessoa.imgDestaque = req.body.imgDestaque;
		pessoa.nome = req.body.nome;
		pessoa.sobrenome = req.body.sobrenome;
		pessoa.dataNascimento = req.body.dataNascimento;
		pessoa.matricula = req.body.matricula;
		pessoa.sexo = req.body.sexo;
		pessoa.nomeMae = req.body.nomeMae;
		pessoa.estadoCivil = req.body.estadoCivil;
		pessoa.email = req.body.email;
		pessoa.cpf = req.body.cpf;
		pessoa.rg = req.body.rg;
		pessoa.telefone = req.body.telefone;
		pessoa.celular = req.body.celular;
		pessoa.login = req.body.login;
		pessoa.senha = md5(req.body.senha);
		pessoa.ativo = req.body.ativo;

		req.pessoa.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json(req.pessoa);
			}
		});
	};


	var atualizar = function(req, res){
		console.log(' ::: Atualizar ');
		if(req.body._id){
			delete req.body._id;
		}

		for(var p in req.body){
			req.pessoa[p] = req.body[p];	
		}

		if(req.pessoa.senha){
			req.pessoa.senha = md5(req.pessoa.senha);
		}
		
		console.log(req.pessoa);
		req.pessoa.save(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.json(req.pessoa);
			}
		});
	};


	var remover = function(req, res){
		console.log(' ::: Remover pessoa');
		req.pessoa.remove(function(err){
			if(err){
				res.status(500).send(err);
			} else {
				res.status(204).send('pessoa removido.');
			}
		});
	
	};


	var listar = function(req, res){
		console.log(' ::: Listar pessoa');
		
		pessoaModel.find(req.query, function(err, pessoas){
			if(err){
				res.status(500).send(err);
			} else {
				var returnpessoas = [];
				pessoas.forEach(function(element, index, array){
					var pessoaObj = element.toJSON();
					pessoaObj.links = {};
					pessoaObj.links.self = 'http://'+req.headers.host + '/api/pessoa/v1/' + pessoaObj._id;
					returnpessoas.push(pessoaObj);
				});

				res.json(returnpessoas);
			}
		});
	};


	return {
		substituir 	: substituir,
		atualizar 	: atualizar,
		listar 		: listar,
		remover 	: remover,
		salvarNovo 	: salvarNovo
	};

};

module.exports = pessoaController;