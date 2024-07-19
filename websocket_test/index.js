/* (для примера socket-соединения - вместо http используем ws, при открытии приложения или при нажатии на кнопку обменивается с сервером сообщениями) */
const btn = document.querySelector('#btn');
const socket = new WebSocket('ws://localhost:5000/'); /* (создаем обьект сокета, обращаемся к хосту(каждая открытая вкладка является отдельным клиентом), вместо http теперь ws-протокол) */

socket.onopen = () => { /* (функционал для открытия сокета - отработает при запуске html-документа в браузере) */
    // console.log('ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО');
    socket.send(JSON.stringify({ /* (при запуске отправит на сервер обьект с данными пользователя) */
        method: "connection",
        id: 555,
        username: "Ulbi TV"
    }))
}

socket.onmessage = (event) => { /* (обработка сообщения с сервера(принимает event, в поле data - текст сообщения)) */
    console.log('С сервера пришло сообщение', event.data);
}

btn.addEventListener('click', () => {
    // socket.send('Привет сервер'); /* (send отправит сообщение на сервер) */
    socket.send(JSON.stringify({
        message: "Hello",
        method: "message",
        id: 555,
        username: "Ulbi TV"
    }))
})