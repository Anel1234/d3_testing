var express = require('express'),
    cors = require('cors'),
    app = express(),
    http = require('http'),
    httpServer = http.Server(app),
    port = 3000;

app.use(cors());
app.use(express.static(__dirname));


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.listen(port);
console.log(`Server started on port: ${port}`)