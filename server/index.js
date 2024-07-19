const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const WSServer = require('express-ws')(app); /* (запускаем вебсокет-сервер) */
const aWss = WSServer.getWss(); /* (переменная aWss(по документации) для широковещательной рассылки(на всех пользователей - в поле client(каждая открытая вкладка у клиента является отдельным клиентом))) */

const PORT = process.env.PORT || 5000;

app.use(cors()); /* (для обмена данными с клиентом) */
app.use(express.json()); /* (для работы с json-форматом) */

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

app.post('/image', (req, res) => { /* (для сохранения сессии - при рисовании при отпускании кнопки мышки на этот эндпоинт будет отправлен запрос) */
    try {
        const data = req.body.img.replace(`data:image/png;base64,`, ""); /* (изображение для сохранения придходит в строке, удаляем из нее лишнее) */
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, "base64"); /* (перекодируем и сохраняем изображение в папку files) */
        return res.status(200).json({message: "Загружено"})
    } catch (e) {
        console.log(e);
        return res.status(500).json('error');
    }
})
app.get('/image', (req, res) => { /* (при подключении клиента на этот эндпоинт будет отправлен запрос - сервер передаст последнее сохранение его сессии и он сможет ее продолжить) */
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`)); /* (считываем изображение из папки) */
        const data = `data:image/png;base64,` + file.toString('base64'); /* (перекодируем в строку) */
        res.json(data); /* (отправляем на пользователя) */
    } catch (e) {
        console.log(e);
        return res.status(500).json('error');
    }
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


