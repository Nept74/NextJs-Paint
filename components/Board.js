import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";

const Board = () => {

    const canvasRef = useRef(null);
    const [penWidth, setPenWidth] = useState(3);
    const [penColor, setPenColor] = useState('black');
    const [fabricCanvas, setFabricCanvas] = useState();

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            backgroundColor: 'white',
            width: window.innerWidth,
            height: window.innerHeight * 0.6,
            isDrawingMode: true,
        })
        setFabricCanvas(canvas);

        return () => {
            canvas.dispose();
        }
    }, [canvasRef])

    useEffect(() => {
        const handleResize = () => {
          if (fabricCanvas) {
            fabricCanvas.setWidth(window.innerWidth);
            fabricCanvas.setHeight(window.innerHeight * 0.6);
            fabricCanvas.renderAll();
          }
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, [fabricCanvas]);

    const changePenWidth = (width) => {
        if (fabricCanvas) {
            fabricCanvas.freeDrawingBrush.width = width;
            setPenWidth(width);
            fabricCanvas.renderAll.bind(fabricCanvas);
        }
    }

    const changePenColor = (color) => {
        if (fabricCanvas) {
            fabricCanvas.freeDrawingBrush.color = color;
            setPenColor(color);
            fabricCanvas.renderAll.bind(fabricCanvas);
        }
    }

    const downloadBoard = () => {
        const pngData = fabricCanvas.toDataURL("png");
        const downloadLink = document.createElement('a');
        const fileName = `whiteboard-session-${Math.random().toString().replace(".", "")}.png`

        downloadLink.href = pngData;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    const clearCanvas = () => {
        if (fabricCanvas) {
            fabricCanvas.clear()
            fabricCanvas.backgroundColor = 'white'
        }
    }
    return (
        <div className="container w-full h-full">
            <p>whiteboard</p>
            <canvas ref={canvasRef}></canvas>
            <div className="my-4 w-full flex flex-col md:flex-row md:space-x-4 space-around">
                <div className="flex flex-col">
                    <div className="flex space-x-2">
                        <label>Pen Width - {penWidth}</label>
                        <input type="range"
                            onChange={e => changePenWidth(e.target.value)}
                            value={penWidth}
                            min={1} max={30}></input>
                    </div>
                    <div className="flex space-x-2">
                        <label>Pen Color - {penColor}</label>
                        <input type="color"
                            onChange={e => changePenColor(e.target.value)}
                            value={penColor}></input>
                    </div>
                </div>
                <button onClick={() => downloadBoard()}
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 px-3 py-3 text-white">
                    Download whiteboard
                </button>
                <button onClick={() => clearCanvas()}
                    type="button"
                    className="bg-red-600 hover:bg-red-700 px-3 py-3 text-white"
                >
                    Clear whiteboard
                </button>
            </div>
        </div>
    )
}

export default Board