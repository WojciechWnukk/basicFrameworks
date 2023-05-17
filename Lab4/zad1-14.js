const express = require('express') //import frameworka
const path = require('path')
const app = express() //utworzenie obiektu aplikacji express
app.use(express.json()); //ustawienie obsługi formatu JSON
app.use(express.urlencoded({ extended: true }));
//const { check, validationResult } = require('express-validator')
const PORT = 3000 //ustawienie portu
const routes = require('./api/routes')
const metoda = require('./middleware/metoda')

app.use('/api', routes)

          



app.listen(PORT, ()=> console.log(`Serwer działa na porcie ${PORT}`))

