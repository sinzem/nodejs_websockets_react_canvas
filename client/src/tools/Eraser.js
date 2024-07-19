/* (класс для инструмента eraser - вместо стирания рисует цветом фона) */
import Brush from "./Brush";

export default class Eraser extends Brush { /* (наследуем класс от кисточки, передаем цвет) */

    draw(x, y) {
        this.ctx.strokeStyle = "white"
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}
