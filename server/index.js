const express = require('express');
const app = express();
const WSServer = require('express-ws')(app); /* (запускаем вебсокет-сервер) */
const aWss = WSServer.getWss(); /* (переменная aWss(по документации) для широковещательной рассылки(на всех пользователей - в поле client(каждая открытая вкладка у клиента является отдельным клиентом))) */

const PORT = process.env.PORT || 5000;

app.ws('/', (ws, req) => { /* (эндпоинт отработает при подключении ws-приложения) */
    // console.log('Подключение установлено'); 
    // ws.send('Ты успешно подключился'); /* (send отправит CТРОКУ на пользователя) */
    ws.on('message', (msg) => { /* (обрабатываем сообщение, как аргумент идет само сообщение) */
        // console.log(msg);
        msg = JSON.parse(msg); /* (переганяем в обьект) */
        switch (msg.method) { /* (запускаем функцию в зависимости от метода в сообщении) */
            case "connection": 
                connectionHandler(ws, msg);
                break;
            case "draw":
                broadcastConnection(ws, msg);
                break;
        }
    })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const connectionHandler = (ws, msg) => { /* (функция отработает при соединении) */
    ws.id = msg.id; /* (присваиваем id каждому соединению - по id пользователя из сообщения) */
    broadcastConnection(ws, msg);
}

const broadcastConnection = (ws, msg) => { /* (функция рассылки на всех подключенных пользователей) */
    aWss.clients.forEach(client => { /* (перебираем подключенных пользователей, тому, у которого id совпадает с сессией, отправляем сообщение(в поле client содержатся все подключенные)) */
        // if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        // }
    })
}


