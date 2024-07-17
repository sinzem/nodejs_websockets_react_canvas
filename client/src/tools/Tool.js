/* (класс для инструментов canvas) */


export default class Tool {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d'); /* (context - обьект canvas, который позволяет рисовать на нем) */
        this.destroyEvents();
    }

    destroyEvents() { /* (функция для удаления слушателей с элемента(при переключении)) */
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
    }
} /* (исходный клас для инструментов, импортируем в классы каждого инструмента) */