const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController  {
    async create(req, res){
        try{
            const usuario = await UsuarioModel.create(req.body);

            const { senha, ...novoUsuario} = usuario.toObject();

            return res.status(500).json(novoUsuario);

        } catch (error){
            res.status(500).json({message: "Deu ruim aqui!", error: error.message});

        }

        
    }
    async read(req, res){
        try{
            const usuarios = await UsuarioModel.find();

            res.status(200).json(usuarios);

        } catch (error){
            res.status(500).json({message: "Deu ruim aqui!", error: error.message});

        }
 
    }
    async update(req, res){
        try{
            const { id } = req.params;
             const usuarioEncontrado = await UsuarioModel.findById(id);

             if(!usuarioEncontrado) return res.status(404).json({ message: "Usuário não encontrado"});

             const usuario = await usuarioEncontrado.set(req.body).save();
        
           
    
            res.status(200).json(usuario);


        } catch (error){
            res.status(500).json({message: "Deu ruim aqui!", error: error.message});

        }

    }
    async delete(req, res){
        try{
            const {id} = req.params;

            const usuarioEncontrado = await UsuarioModel.findById(id);

            if(!usuarioEncontrado) return res.status(404).json({ message: "Usuário não encontrado"});

            await usuarioEncontrado.deleteOne();
       

    
            res.status(200).json({"mensagem": "Usuário deletado com sucesso!"});


        } catch (error){
            res.status(500).json({message: "Deu ruim aqui!", error: error.message});

        }
        
    }
}

module.exports = new UsuarioController();