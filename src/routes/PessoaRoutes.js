var express = require('express');

var pessoaModel = require('../models/PessoaModel');

var pessoaRouter = express.Router();

var pessoaController = require('../controller/PessoaController')(pessoaModel);


pessoaRouter.route('/')
		.post(function(req, res){
			pessoaController.salvarNovo(req, res);
		})
		.get(function(req, res){
			pessoaController.listar(req, res);
		});


pessoaRouter.use('/:pessoaId', function(req, res, next){
	// esse é nosso middleware
	pessoaModel.findById(req.params.pessoaId, function(err, pessoa){
		if(err){
			res.status(500).send(err);
		} else if(pessoa) {
			req.pessoa = pessoa;
			next();
		} else {
			res.status(404).send('Pessoa não encontrado');
		}
	});
});


pessoaRouter.route('/:pessoaId')
		.get(function(req, res){
			res.json(req.pessoa);
		})
		.put(function(req, res){
			pessoaController.substituir(req, res);
		})
		.patch(function(req, res){
			pessoaController.atualizar(req, res);
		})
		.delete(function(req, res){
			pessoaController.remover(req, res);
		});
		

module.exports = pessoaRouter;
