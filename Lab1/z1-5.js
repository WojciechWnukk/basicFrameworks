const http = require("http")
const hostname = "localhost"
const port = 3000
const server = http.createServer((req, res) => {
res.statusCode = 200
res.setHeader("Content-Type", "text/html")
res.end(`
<html>
    <head>
        <title> Aplikacja node </title>
    </head>
    <body>
        <h1> Aplikacja w Node </h1>
        <p> To jest odpowiedz HTML </p>
        <ol type="1">
        <li> </li>
        <li> </li>
        <li> </li>
        </ol>
    </body>
</html>
`)
})
server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`)
})
