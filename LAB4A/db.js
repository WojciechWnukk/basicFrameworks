const mongoose = require('mongoose');
//mongoose.connect("mongodb://127.0.0.1:27017/StudentDB", { useNewUrlParser: true })
mongoose.connect("mongodb+srv://wojti767:Wojtek123@veb.1ouiowz.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then((result) => {
    console.log("Połączono z bazą")
    }).catch((err) => {
    console.log("Nie można połączyć się z MongoDB. Błąd: " + err)
   })

module.exports = mongoose.connection;