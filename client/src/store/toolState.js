/* (Состояния для панели инструментов) */
import {makeAutoObservable} from "mobx";

class ToolState {
    tool = null; /* (состояние для выбраного инструмента) */

    constructor() {
        makeAutoObservable(this); /* (для автоматического отслеживания состояний) */
    } 

    /* (action для изменения состояний) */
    setTool(tool) {
        this.tool = tool;
    }
    setFillColor(color) {
        this.tool.fillColor = color;
    }
    setStrokeColor(color) {
        this.tool.strokeColor = color;
    }
    setLineWidth(width) {
        this.tool.lineWidth = width;
    }
}

export default new ToolState();