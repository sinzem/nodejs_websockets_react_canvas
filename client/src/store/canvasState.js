/* (Состояния для canvas) */
import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas = null; 

    constructor() {
        makeAutoObservable(this); /* (для автоматического отслеживания состояний) */
    } 

    /* (action для изменения состояний) */
    setCanvas(canvas) {
        this.canvas = canvas;
    }
}

export default new CanvasState();