/* (класс для инструмента line - прямая линия) */
import Tool from './Tool';

export default class Line extends Tool {
    constructor(canvas) {
        super(canvas); /* (подключаем в клас canvas) */
        this.listen(); /* (запускаем функцию-слушатель работы с canvas) */
    }

    listen() {  /* (функция привяжет следующие функции-слушатели движений мышки к контексту) */
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
        this.currentX = e.pageX - e.target.offsetLeft;
        this.currentY = e.pageY - e.target.offsetTop;
        this.ctx.beginPath(); /* (запускаем для начала рисования(новая линия)) */
        this.ctx.moveTo(this.currentX, this.currentY); /* (вычисление начальной точки рисования) */
        this.saved = this.canvas.toDataURL(); /* (сохраняем изображение с canvas - понадобится в draw для сохранения созданного прямоугольника) */
       
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) { /* (если мышка нажата, запускаем функцию рисования, передаем координаты курсора) */
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop); 
        }
    }

    draw(x, y) {
        const img = new Image(); /* (создаем новое изображение) */
        img.src = this.saved;  /* (помещаем в него изображение canvas на начало рисования(из mouseDownHandler)) */
        img.onload = () => {  /* (в начале рисования очищаем canvas и помещаем в него сохраненное изображение, задаем начало и рисуем) */
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo(this.currentX, this.currentY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }
} /* (подключаем в ToolBar на кнопку) */