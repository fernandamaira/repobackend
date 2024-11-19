const jwt = require("jsonwebtoken");

function verificarJwt(req, res, next) {

    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    //todo token tem que vir nesse formato "Bearer espaco valor do token", validar se esta nesse formato 
    if(!authHeader) return res.status(403).json({message:"Header de autorização não encontrado"});
    //403 eh status de proibido

    const [bearer, token] = authHeader.split(" ");
    if (!/^Bearer$/.test(bearer)) return res.status(403).json({message:"Header de autorização mal formatado"});
    //ver se bearer tem esse valor independente das letras estarem maiúsculas ou minúsculas
    if(!token) return res.status(403).json({message:"JWT token não encontrado"});
    
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if(err) return res.status(403).json({message:"JWT token inválido"}); 

        req.usuarioId = usuario._id;
        next();
    //mandar p proxima funcao que vai processar a requisicao
    } );
    
}

module.exports = verificarJwt;