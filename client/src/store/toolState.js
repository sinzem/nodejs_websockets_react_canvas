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
}

export default new ToolState();