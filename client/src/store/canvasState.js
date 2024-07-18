/* (Состояния для canvas) */
import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas = null;  /* (помещаем сам элемент canvas в состояния) */
    socket = null; /* (состояние подключения) */
    sessionid = null; /* (id сессии подключения) */
    undoList = []; /* (сохраняем действия) */
    redoList = []; /* (для отмененных действий) */
    username = ""; /* (для имени пользователя - будет вводить в модальное окно) */

    constructor() {
        makeAutoObservable(this); /* (для автоматического отслеживания состояний) */
    } 

    /* (action для изменения состояний) */
    setCanvas(canvas) {
        this.canvas = canvas;
    }

    setSocket(socket) {
        this.socket = socket;
    }
    
    setSessionId(id) {
        this.sessionid = id;
    }

    setUsername(username) {
        this.username = username;
    }

    pushToUndo(data) {
        this.undoList.push(data);
    } 
    pushToRedo(data) {
        this.redoList.push(data);
    }

    undo() { /* (функция для отката действий назад, подключаем на кнопку в Toolbar) */
        let ctx = this.canvas.getContext('2d'); /* (получаем обьект контекста canvas) */
        if (this.undoList.length > 0) { /* (если действия уже производились) */
            let dataUrl = this.undoList.pop(); /* (получаем из массива сохраненных действий последнее изображение canvas)) */
            this.redoList.push(this.canvas.toDataURL()); /* (помещаем текущее состояние canvas в массив для возврата отмененных действий) */
            let img = new Image(); /* (cоздаем обьект оизображения) */
            img.src = dataUrl; /* (добавляем к нему полученное из массива) */
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); /* (полностью очищаем canvas) */
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height); /* (помещаем в canvas изображение из массива) */
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); /* (если действий для отмены нет, просто очищаем canvas) */
        }
    }

    redo() { 
        let ctx = this.canvas.getContext('2d');
        if (this.redoList.length > 0) { 
            let dataUrl = this.redoList.pop(); 
            this.undoList.push(this.canvas.toDataURL()); 
            let img = new Image(); 
            img.src = dataUrl; 
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height); 
            }
        } 
    }
}

export default new CanvasState();