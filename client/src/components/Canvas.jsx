import { useEffect, useRef } from "react";
import {observer} from "mobx-react-lite"; /* (для отслеживания изменений) */
import '../styles/canvas.scss';
import canvasState from "../store/canvasState"; 
import toolState from "../store/toolState";
import Brush from "../tools/Brush";


const Canvas = observer(() => { /* (для отслеживания измененийв состояниях оборачиваем в observer) */
    const canvasRef = useRef(); /* (через реф напрямую подвязываемся к элементу(подключаем и в самом элементе)) */

    useEffect(() => {
        console.log(canvasRef.current);
        canvasState.setCanvas(canvasRef.current); /* (при загрузке текущее состояние элемента попадает в состояния) */
        toolState.setTool(new Brush(canvasRef.current)) /* (помещаем в состояния инструментов кисть с текущим canvas) */
    }, [])

    return (
        <div className="canvas">
            {/* (размеры canvas рекоммендуется задавать в html, иначе они могут отображаться неточно) */}
            <canvas width={600} height={400} ref={canvasRef} ></canvas>            
        </div>
    );
});

export default Canvas;