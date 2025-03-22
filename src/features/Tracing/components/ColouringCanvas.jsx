import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image, Line } from "react-konva";

const HandColoringCanvas = ({ imageUrl }) => {
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#ff5f3d");

  useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl; // Load the hand image
    img.onload = () => setImage(img);
  }, [imageUrl]);

  const handleMouseDown = (e) => {
    setDrawing(true);
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], color }]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines((prevLines) => {
      const updatedLines = [...prevLines];
      const lastLine = updatedLines[updatedLines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      return updatedLines;
    });
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleClear = () => {
      // setLines([]);
      setColor('#ffffff')
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Canvas */}
      <div>
        <Stage
          width={500}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {/* Load the Image */}
            {image && <Image image={image} width={500} height={500} />}
            {/* Drawing Layer */}
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={20}
                lineCap="round"
                lineJoin="round"
              />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* Tools Panel */}
      <div className="flex flex-col space-y-4">
        <h3 className="text-sm font-semibold text-gray-600">Select Color:</h3>
        <div className="flex flex-col space-y-2">
          {["#ff5f3d", "#ffbf1b", "#ffc0cb", "#add8e6", "#90ee90"].map((c) => (
            <div
              key={c}
              className="w-8 h-8 rounded-full cursor-pointer border"
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            ></div>
          ))}
        </div>
        <div>
          <label className="text-gray-600 text-sm mb-1 block">Choose Custom:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="cursor-pointer"
          />
        </div>
        <button onClick={handleClear} className="px-4 py-2 bg-red-500 text-white rounded-lg">Eraser</button>
      </div>
    </div>
  );
};

export default HandColoringCanvas;
