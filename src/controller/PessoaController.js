
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

		var limite = 1000;
		if(req.query.limite){
			limite = req.query.limite;
		}
		console.log(limite);

		var query = [];

		if(req.query){

			if(req.query.dono){
				query.push({dono : req.query.dono});
			}

			if(req.query.cpf){
				query.push({cpf : req.query.cpf});
			}

			if(req.query.rg){
				query.push({rg : req.query.rg});
			}

			if(req.query.documento_extra1){
				query.push({documento_extra1 : req.query.documento_extra1});
			}

			if(req.query.documento_extra2){
				query.push({documento_extra2 : req.query.documento_extra2});
			}

			if(req.query.documento_extra3){
				query.push({documento_extra3 : req.query.documento_extra3});
			}

			if(req.query.info_extra1){
				query.push({info_extra1 : req.query.info_extra1});
			}

			if(req.query.info_extra2){
				query.push({info_extra2 : req.query.info_extra2});
			}

			if(req.query.info_extra3){
				query.push({info_extra3 : req.query.info_extra3});
			}

			if(req.query.email){
				query.push({email : req.query.email});
			}

			if(req.query.nome){
				query.push({nome : RegExp(req.query.nome, "i") });
			}	

			if(req.query.login){
				query.push({login : req.query.login});
			}	
		}
		 
		console.log(query);
		var queryFinal = {};
		if(query && query.length > 0){
			queryFinal = { $and: query };
		}
		
		
		pessoaModel.find(queryFinal, function(err, pessoas){
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
		}).limit(limite);
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