let metoda = (req, res, next) => {
    console.log("Metoda: ",req.method)
    let sciezka = "Ścieżka: "+ req.protocol + "://" + req.get('host') + req.originalUrl
    console.log(sciezka)
    res.setHeader('Content-Type', 'text/plain')
    res.send(sciezka)
   }

   module.exports = metoda;