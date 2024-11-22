const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SessoesModel = require ("../Models/SessoesModel");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema ({
    email: {
        type: String,
        unique: true,
    },
    nome: {
        type: String,
        unique: true,
    },
    senha: {
        type: String,
        select: false,
    },
    cargo: String,
    status: String
});

UsuarioSchema.pre("save", async function (next){
    const user = this
    if (user.isModified("senha")) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.senha, salt);

        user.senha = hash;

        console.log({ salt, hash });
    }
next()
});

UsuarioSchema.pre("deleteOne", { document: true, query: false }, async function (){
    const usuario = this;
    return SessoesModel.deleteOne ({ id_usuario: usuario._id});
});

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;
