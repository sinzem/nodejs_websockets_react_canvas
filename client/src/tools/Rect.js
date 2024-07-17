/* (класс для инструмента Rect(прямоугольник)) */
import Tool from './Tool';

export default class Rect extends Tool {
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
        this.ctx.beginPath(); /* (запускаем для начала рисования) */
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL(); /* (сохраняем изображение с canvas - понадобится в draw для сохранения созданного прямоугольника) */
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) { /* (если мышка нажата, запускаем функцию рисования, передаем координаты курсора) */
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            this.draw(this.startX, this.startY, width, height); 
        }
    }

    draw(x, y, w, h) { /* (кроме координат передаем ширину и высоту прямоугольника) */
        const img = new Image(); /* (создаем новое изображение) */
        img.src = this.saved; /* (помещаем в него изображение canvas на начало рисования(из mouseDownHandler)) */
        img.onload = () => { /* (в начале рисования очищаем canvas и помещаем в него сохраненное изображение, задаем начало и рисуем - без этого при диагональных движениях мышкой получается много прямоугольников, которые накладываются друг на друга) */
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h); /* (встроенная функция для построения прямоугольников) */
            this.ctx.fill(); /* (для заполнения прямоугольника) */
            this.ctx.stroke(); /* (выделение/обводка) */
        }
    }
} /* (подключаем в ToolBar на кнопку) */