const UsuarioModel = require("../Models/UsuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//token eh retornado quando a pessoa faz a requisicao do login
class AuthController {
    async login (req, res) {
        try {
            const { email, senha } = req.body;

            const usuarioEncontrado = await UsuarioModel.findOne({ email }).select("+senha");
            //email eh campo unico entao se ele existir no banco de dados, ele vai pertencer a um único usuario

            if(!usuarioEncontrado) return res.status(403).json({message: "E-mail ou senha inválidos"});

            const ehCorrespondente = await bcrypt.compare(senha, usuarioEncontrado.senha);
            if(!ehCorrespondente) return res.status(403).json({message: "E-mail ou senha inválidos"});

            const { senha: hashdesenha, ...payload} = usuarioEncontrado.toObject();
            //transformar usuario retornado do mongoose em objeto padrao do javascript 
            //renomear senha pois ja tem no body da requisicao
            // ... compilar o resto e colocar no payload (objeto)

            const token = await jwt.sign({
                payload
            }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_IN}); 
            //node -p "require('crypto').randomBytes(48).toString('hex');"
            //comando p gerar conjunto de caracteres p chave secreta
            //quanto tempo permanecer como token válido


            res.status(200).json({token});

        } catch(error){
            res.status(500).json({message: "Deu ruim aqui!", error: error.message});
        }
    }
}

module.exports = new AuthController();