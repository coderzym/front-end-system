var ws = require('nodejs-websocket')

var server = ws.createServer(function (conn) {
    conn.on('text', function (str) {
        var data = JSON.parse(str)
        switch (data.type){
            case 'setName':
                board(`${data.name}进入了房间`)
                break;
            case 'chat':
                board(`${data.text}`)
                break;
        }
        
    })

    conn.on('error', function (error) {
        console.log(error);
    })

    conn.on('close', function () {
        board(`${data.name}离开了房间`)
    })

}).listen(2333)

function board(str) {
    server.connections.forEach(conn => {
        conn.sendText(str)
    })
}