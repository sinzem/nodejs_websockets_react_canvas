/* (класс для инструмента brush) */
import Tool from './Tool';

export default class Brush extends Tool {
    constructor(canvas) {
        super(canvas); /* (подключаем в клас canvas) */
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
    }
    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath(); /* (запускаем для начала рисования(новая линия)) */
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop); /* (вычисление начальной точки рисования) */
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) { /* (если мышка нажата, запускаем функцию рисования, передаем координаты курсора) */
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop); 
        }
    }

    draw(x, y) {
        /* (запустит функции canvas) */
        this.ctx.lineTo(x, y); 
        this.ctx.stroke(); /* (выделит линию цветом) */
        console.log("draw brush");
    }
} /* (подключаем в ToolBar на кнопку и в Canvas делаем кисточку активной при загрузке) */