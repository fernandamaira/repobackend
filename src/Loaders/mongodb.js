const mongoose = require("mongoose");

async function startDB(){
    console.log(process.env.MONGO_URI);  // Deve exibir a URL do MongoDB

    await mongoose.connect(process.env.MONGO_URI);
}

module.exports = startDB;
