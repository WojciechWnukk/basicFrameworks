const express = require('express') //import frameworka
const path = require('path')
const app = express() //utworzenie obiektu aplikacji express
app.use(express.json()); //ustawienie obsługi formatu JSON
app.use(express.urlencoded({ extended: true }));
const { check, validationResult } = require('express-validator')
const PORT = 3000 //ustawienie portu

//routing:

app.get('/name/:imie', function (request, response) {
    response.status(200)
    response.set('Content-Type', 'text/html')
    response.end('<html><body>' + '<h1>Cześć ' + request.params.imie + '</h1>' + '</body></html>'
    )
    })

    app.get('/name/:imie1/:imie2', function (request, response) {
        response.status(200)
        response.set('Content-Type', 'text/html')
        response.end('<html><body>' + '<h1>Cześć ' + request.params.imie1 + ' i ' + request.params.imie2 + '</h1>' + '</body></html>'
        )
        })


        app.get("/form", (req, res) => {
            res.sendFile(path.join(__dirname, "form_zad10.html"))
           })
    
           function getInitials(name) {
            const initials = name
              .split(" ")
              .map((word) => word.charAt(0))
              .join(".");
            return initials;
          }
/*
    app.post("/form",[
        check('name')
            .isLength({max: 25}).withMessage("Za dlugie imie")
            //.isAlpha().withMessage("Nazwisko może składać się wyłącznie z liter alfabetu.")
            .stripLow()
            .trim()
            .bail()
            .customSanitizer((value) => {
                const initials = getInitials(value);
                return initials;
              }),
            check('email')
                .isEmail()
                .normalizeEmail()
                .stripLow()
                .trim()
                .bail(),
        check('age')
            .isNumeric().withMessage("Wiek musi być liczbą.")
            .isInt({min: 0, max: 110}).withMessage("Wiek musi zawierać się w przedziale od 0 do 110.")
            .trim()
            .bail()
    ], (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
            }
            const name = req.body.name
            const email = req.body.email
            const age = req.body.age           
            const initials = getInitials(name);
            res.send("Uzytkownik: " + initials + "<br> Email: " + email + "<br>Wiek: " + age)
            
    })*/
//stary form
/*
    app.post("/result", (req, res) => {
        let name = req.body.name
        const initials = getInitials(name);
        let email = req.body.email
        let age = req.body.age

        if(!name || !email || !age){
            res.send("Uzupelnij dane")
        } else{
            res.send("Użytkownik: " + name + "<br>Inicjały: " + initials + "<br>Hasło: " + email + "<br>Wiek: " + age)
        }

       })*/
//zad 10
//

app.post("/result", (req, res) => {
    let name = req.body.name;
    let jezyki = req.body.language;
    if (!name) {
      res.send("Uzupelnij dane");
    } else {
      let jezykiList;
      if (!jezyki) {
        jezykiList = "brak";
      } else if (typeof jezyki === "string") {
        jezykiList = jezyki;
      } else if (Array.isArray(jezyki)) {
        if (jezyki.length == 1) {
          jezykiList = jezyki[0];
        } else {
          jezykiList = "<li>" + jezyki.join("</li><li>") + "</li>";
        }
      } else {
        jezykiList = "Nieznana wartość języków";
      }
      res.send("Użytkownik: " + name + "<br>Znajomość języków: " + jezykiList);
    }
  });
  
  
//
//1.13
/*
       app.post("/result", isAuthorized, (req, res) => {
        let name = req.body.username
        
        if(!name){
            res.send("Uzupelnij dane")
        } else{
            
            res.send("Użytkownik: " + name)
        }

       })
       const users = require('./users');

       
       app.get('/api/users', (req,res) => {
        res.json(users);
       });

       app.get('/api/users/:id', (req, res) => {
        const found = users.some(user => user.id === parseInt(req.params.id))
        if(found){
            res.json(users.filter(user => user.id === parseInt(req.params.id)))
        } else {
            res.status(400).json({msg: `Użytkownik o id ${req.params.id} nie został odnaleziony`})}
        })
*/


        let metoda = (req, res, next) => {
            console.log("Metoda: ",req.method)
            let sciezka = "Ścieżka: "+ req.protocol + "://" + req.get('host') + req.originalUrl
            console.log(sciezka)
            res.setHeader('Content-Type', 'text/plain')
            res.send(sciezka)
           }


        //app.use("/api/users",metoda)
        app.post('/api/users', (req, res) => {
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
           
           app.patch('/api/users/:id', (req, res) => {
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
           
           app.delete('/api/users/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const index = users.findIndex(user => user.id === id);
          
            if (index !== -1) {
              users.splice(index, 1);
              res.json({ msg: `Użytkownik o id ${id} został usunięty.` });
            } else {
              res.status(404).json({ msg: `Użytkownik o id ${id} nie został odnaleziony.` });
            }
          });
          /*
function isAuthorized(req, res, next){
  const secretPassword = "tajne";
  let password = req.body.password;
  if(password === secretPassword){
    res.send("Uzyskano dostep");
    return;
  }
  else{
    res.status(401).send("Dostęp zabroniony");
    return;
  }

}*/



          



app.listen(PORT, ()=> console.log(`Serwer działa na porcie ${PORT}`))

