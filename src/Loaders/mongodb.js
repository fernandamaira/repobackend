const mongoose = require("mongoose");

async function startDB(){
    await mongoose.connect('mongodb+srv://fernandamcresende:ryyWegkX0vZdX1Qv@cluster0.0bdhz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
}

module.exports = startDB;
