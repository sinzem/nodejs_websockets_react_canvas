/* (класс для инструментов canvas) */


export default class Tool {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d'); /* (context - обьект canvas, который позволяет рисовать на нем) */
        this.destroyEvents();
    }

    /* (сеттеры для настройки параметров инструмента, вызываем в toolState для записи состояния) */
    set fillColor(color) {
        this.ctx.fillStyle = color;
    }
    set strokeColor(color) {
        this.ctx.strokeStyle = color;
    }
    set lineWidth(width) {
        this.ctx.lineWidth = width;
    }

    destroyEvents() { /* (функция для удаления слушателей с элемента(при переключении)) */
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
} /* (исходный клас для инструментов, импортируем в классы каждого инструмента) */