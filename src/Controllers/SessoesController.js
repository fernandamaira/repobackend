const SessoesModel = require("../Models/SessoesModel");
//usa await quando retorna promise

class SessoesController  {
    async create(req, res){
        try{
        const sessoes = await SessoesModel.create(req.body);
        res.status(200).json(sessoes);
    } catch (error){
        res.status(500).json({message: "Deu ruim aqui!", error: error.message});
    }
}
    async read(req, res){
        try{
        const sessoes = await SessoesModel.find().populate('id_usuario', '-senha');

        res.status(200).json(sessoes);
    } catch {
        res.status(500).json({message: "Deu ruim aqui!", error: error.message});

    }
}
    update(req, res){
    
    }
    async delete(req, res){
        try{
        const {id} = req.params
        await SessoesModel.findByIdAndDelete(id);

        res.status(200).json({"mensagem": "Sessão deletada com sucesso!"});    
    } catch {
        res.status(500).json({message: "Deu ruim aqui!", error: error.message});
    }
}
}

module.exports = new SessoesController();