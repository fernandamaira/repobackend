const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController  {
    async create(req, res){
        const usuario = await UsuarioModel.create(req.body);
        return res.status(200).json(usuario);
    }
    async read(req, res){
        const usuarios = await UsuarioModel.find();

        return res.status(200).json(usuarios);
    }
    async update(req, res){
        const { id } = req.params;
        
        const usuario = await UsuarioModel.findByIdAndUpdate(id, req.body, {new: true});

        return res.status(200).json(usuario);
    }
    async delete(req, res){
        const {id} = req.params;
        await UsuarioModel.findByIdAndDelete(id);

        return res.status(200).json({"mensagem": "Usuário deletado com sucesso!"});

        
    }
}

module.exports = new UsuarioController();