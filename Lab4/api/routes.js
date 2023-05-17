const express = require('express')
const router = express.Router()
const users = require("../users.js")
const path = require('path')


const isAuthorized = require("../middleware/autoryzacja.js")
//routing:

           router.get("/form", (req, res) => {
               res.sendFile(path.join(__dirname, "../formstary.html"))
              })
       
          router.post("/result", isAuthorized, (req, res) => {
           let name = req.body.username
           
           if(!name){
               res.send("Uzupelnij dane")
           } else{
               
               res.send("Użytkownik: " + name)
           }
   
          })

   
          
          router.get('/api/users', (req,res) => {
           res.json(users);
          });
   
          router.get('/api/users/:id', (req, res) => {
           const found = users.some(user => user.id === parseInt(req.params.id))
           if(found){
               res.json(users.filter(user => user.id === parseInt(req.params.id)))
           } else {
               res.status(400).json({msg: `Użytkownik o id ${req.params.id} nie został odnaleziony`})}
           });
   
   
   
           
   
   
           //app.use("/api/users",metoda)
           router.post('/api/users', (req, res) => {
               const newUser = {
               id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
               name: req.body.name,
               email: req.body.email,
               status: "aktywny"
               }
               if(!newUser.name || !newUser.email){
               return res.status(400).json({msg: 'Wprowadź poprawne imię i nazwisko oraz email!'})
               }
               users.push(newUser)
               res.json(users)
              })
              
              router.patch('/api/users/:id', (req, res) => {
               const id = parseInt(req.params.id) //pobierz id ze ścieżki w URL
               //sprawdź, czy w tablicy users jest obiekt user o zadanym id:
               if (users.some(user => user.id === id)) {
               //znajdź użytkownika o zadanym id w tablicy - zakładamy, że istnieje tylko jeden taki user:
               const user = users.filter(user => user.id === id).reduce(user => user)
               const updUser = req.body //pobierz obiekt z danymi do aktualizacji z ciała żądania
               //zaktualizuj tylko te właściwości istniejącego obiektu user, które przesłano w żądaniu:
               user.name = updUser.name ? updUser.name : user.name
               user.email = updUser.email ? updUser.email : user.email
               res.json({ msg: 'Dane użytkownika zaktualizowane', user })
               }
               else {
               res.status(400).json({ msg: `Użytkownik o id ${id} nie istnieje!` })
               }
              })
              
              router.delete('/api/users/:id', (req, res) => {
               const id = parseInt(req.params.id);
               const index = users.findIndex(user => user.id === id);
             
               if (index !== -1) {
                 users.splice(index, 1);
                 res.json({ msg: `Użytkownik o id ${id} został usunięty.` });
               } else {
                 res.status(404).json({ msg: `Użytkownik o id ${id} nie został odnaleziony.` });
               }
             });

   module.exports = router;