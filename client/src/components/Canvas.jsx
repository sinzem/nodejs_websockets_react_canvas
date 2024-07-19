import { useEffect, useRef, useState } from "react";
import {observer} from "mobx-react-lite"; /* (для отслеживания изменений) */
import { useParams } from "react-router-dom"; /* (для получения id из адресной строки) */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/canvas.scss';
import canvasState from "../store/canvasState"; 
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";


const Canvas = observer(() => { /* (для отслеживания измененийв состояниях оборачиваем в observer) */
    const canvasRef = useRef(); /* (через реф напрямую подвязываемся к элементу(подключаем и в самом элементе)) */
    const usernameRef = useRef(); /* (для инпута ввода имени пользователя) */
    const [modal, setModal] = useState(true); /* (состояние для модального окна(видимость)) */
    const params = useParams(); /* (получаем обьект запроса(адресную строку)) */

    useEffect(() => {
        console.log(canvasRef.current);
        canvasState.setCanvas(canvasRef.current); /* (при загрузке текущее состояние элемента попадает в состояния) */
        // toolState.setTool(new Brush(canvasRef.current)) /* (помещаем в состояния инструментов кисть с текущим canvas - если без socket) */
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket("ws://localhost:5000/"); /* (создаем соединение с сервером при загрузке) */
            canvasState.setSocket(socket); /* (помещаем в состояния) */
            canvasState.setSessionId(params.id); /* (помещаем в состояния) */
            toolState.setTool(new Brush(canvasRef.current, socket, params.id)); /* (устанавливаем активный инструмент по умолчанию) */
            socket.onopen = () => { /* (при соединении отправляем обьект с id(из params), именем пользователя(из состояний) и именем метода(нужен на серверной стороне для определения, что это соединение)) */
                console.log("Соединение установлено");
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => { /* (ответ от сервера) */
                let msg = JSON.parse(event.data);
                switch (msg.method) { /* (проверяем метод из сообщения) */
                    case "connection": /* (при соединении выводим сообщение в консоль) */
                        console.log(`Пользователь ${msg.username} присоединился`);
                        break;
                    case "draw": 
                        drawHandler(msg);
                        break;
                }
            }
        }
    }, [canvasState.username]) /* (запустится, когда пользователь введет имя в модальное окно) */

    const drawHandler = (msg) => {
        const figure = msg.figure; /* (получаем из сообщения с сервера тип инструмента с координатами мыши) */
        const ctx = canvasRef.current.getContext('2d'); /* (через реф подключаем canvas) */
        switch (figure.type) { /* (в зависимости от типа пришедшего инструмента запускаем статическую функцию из соответствующего класса для отрисовки) */
            case "brush":
                Brush.draw(ctx, figure.x, figure.y);
                break;
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
                break;
            case "finish": /* (случай для окончания операции(отпустили кнопку мыши при рисовании) - вызываем начало новой операции) */
                ctx.beginPath();
                break;
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
    } /* (сохраняем в состояния скрин canvas на случай отмены действия) */

    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value); 
        setModal(false); /* (скраваем модальное окно) */
    } /* (сохраняем в состояния имя пользователя из модального окна) */

    return (
        <div className="canvas">
            {/* (подключаем модальное окно для получения имени пользователя(взял из bootstrap)) */}
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header>
                    <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input type="text" ref={usernameRef} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectionHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* (размеры canvas рекоммендуется задавать в html, иначе они могут отображаться неточно) */}
            <canvas onMouseDown={() => mouseDownHandler()} width={600} height={400} ref={canvasRef} ></canvas>            
        </div>
    );
});

export default Canvas;