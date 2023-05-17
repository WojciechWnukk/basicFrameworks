const http = require('http')
const qs = require('querystring')

let items = []

const server = http.createServer(function (req, res) {
    if (req.url === '/') {
        switch (req.method) {
            case 'GET':
                show(res)
                break
            case 'POST':
                add(req, res)
                break
            default:
                badRequest(res)
        }
    } else if (req.url.startsWith('/remove')) {
        if (req.method === 'DELETE') {
            remove(req, res)
        } else {
            badRequest(res)
        }
    } else {
        notFound(res)
    }
})

server.listen(3000)

function show(res) {
    let html = '<html><head><title>Lista zadań</title></head><body>'
    + '<h1>Lista zadań</h1>'
    + '<form method="post" action="/">'
    + '<p><input type="text" name="item" />'
    + '<input type="submit" value="Dodaj" /></p>'
    if (items.length > 0) {
        html += '<ul>'
        + items.map(function (item, index) {
            return '<li>' + item + ' <button onclick="removeItem(' + index + ')">Usuń</button></li>'
        }).join('')
        + '</ul>'
        + '<script>function removeItem(index) {'
        + 'if (confirm("Czy na pewno chcesz usunąć?")) {'
        + 'fetch("/remove?index=" + index, {method: "DELETE"})'
        + '.then(function(response) { if(response.ok) show(); })'
        + '}}</script>'
    } else {
        html += '<p>Brak zadań</p>'
    }
    html += '</form></body></html>'
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Length', Buffer.byteLength(html))
    res.end(html)
}

function notFound(res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not Found')
}

function badRequest(res) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain')
    res.end('Bad Request')
}

function add(req, res) {
    let body = ''
    req.setEncoding('utf8')
    req.on('data', function (chunk) { body += chunk })
    req.on('end', function () {
        let obj = qs.parse(body)
        items.push(obj.item)
        show(res)
    })
}

function remove(req, res) {
    let query = req.url.split('?')[1]
    let index = parseInt(qs.parse(query).index)
    if (isNaN(index)) {
        badRequest(res)
    } else if (index < 0 || index >= items.length) {
        notFound(res)
    } else {
        items.splice(index, 1)
        if (items.length === 0){
            show(res)
        } else {
        res.statusCode = 204
        res.end()
        }
    }
}
