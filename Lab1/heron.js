const http = require('http')
const url = require('url')
const iconv = require('iconv-lite');
http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8;'})
 let q = url.parse(req.url, true).query
 let a = +q.bok1
 let b = +q.bok2
 let c = +q.bok3
 let p = (a + b + c) / 2
 let pole = Math.sqrt(p * (p - a) * (p - b) * (p - c))
 const string = 'Pole trójkąta to ' + pole.toString()
 const pl = iconv.decode(iconv.encode(string, 'ISO-8859-2'), 'UTF-8')
 res.end(`
 <!DOCTYPE html>
 <html lang="pl">
 <head>
   <meta charset="UTF-8">
   <title>Pole trójkąta</title>
 </head>
 <body>
   <p>${pl}</p>
 </body>
 </html>
 `)

}).listen(3000)