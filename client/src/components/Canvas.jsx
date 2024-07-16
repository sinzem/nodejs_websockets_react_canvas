import '../styles/canvas.scss';

const Canvas = () => {
    return (
        <div className="canvas">
            {/* (размеры canvas рекоммендуется задавать в html, иначе они могут отображаться неточно) */}
            <canvas width={600} height={400}></canvas>            
        </div>
    );
};

export default Canvas;