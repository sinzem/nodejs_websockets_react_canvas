/* (класс для инструмента brush) */
import Tool from './Tool';

export default class Brush extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id); /* (подключаем в клас canvas, также передаем соединение и id сессии) */
        this.listen(); /* (запускаем функцию-слушатель работы с canvas) */
    }

    listen() { /* (функция привяжет следующие функции-слушатели движений мышки к контексту) */
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    /* (функции-слушатели мышки) */
    mouseUpHandler(e) { 
        this.mouseDown = false;
        this.socket.send(JSON.stringify({ /* (при socket-соединении при отпускании мыши отправляем на сервер сообщение о завершении операции, иначе у остальных подключенных пользователей все фигуры будут соединены) */
            method: "draw",
            id: this.id,
            figure: {
                type: 'finish'
            }
        }))
    }
    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath(); /* (запускаем для начала рисования(новая линия)) */
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop); /* (вычисление начальной точки рисования) */
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) { 
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop); /* (если мышка нажата, запускаем функцию рисования, передаем координаты курсора(без socket)) */
            /* (socket - при движении мышью отправляем на сервер обьект с методом - рисование, id - от кого, типом инструмента и координатами мыши) */
            this.socket.send(JSON.stringify({
                method: "draw",
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop
                }
            }))

        }
    }

    /* (без socket) */
    // draw(x, y) {
    //     /* (запустит функции canvas) */
    //     this.ctx.lineTo(x, y); 
    //     this.ctx.stroke(); /* (выделит линию цветом) */
    // }
    /* (socket) */
    static draw(ctx, x, y) { /* (делаем функцию статической, передаем в нее контекст(запускаем в Canvas при получении сообщения с методом draw)) */
        ctx.lineTo(x, y);
        ctx.stroke();
    }

} /* (подключаем в ToolBar на кнопку и в Canvas делаем кисточку активной при загрузке) */