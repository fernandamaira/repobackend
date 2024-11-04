const SessoesModel = require("../Models/SessoesModel");

class SessoesController  {
    async create(req, res){
        const sessoes = await SessoesModel.create(req.body);
        return res.status(200).json(sessoes);
    }
    async read(req, res){
        const sessoes = await SessoesModel.find().populate('id_usuario', '-senha');

        return res.status(200).json(sessoes);
    }
    update(req, res){
    
    }
    async delete(req, res){
        const {id} = req.params
        await SessoesModel.findByIdAndDelete(id);

        return res.status(200).json({"mensagem": "Sessão deletada com sucesso!"});

        
    }
}

module.exports = new SessoesController();