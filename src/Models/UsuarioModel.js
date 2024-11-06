const mongoose = require("mongoose");

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
    senha: String,
    cargo: String,
    status: String
})

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;
