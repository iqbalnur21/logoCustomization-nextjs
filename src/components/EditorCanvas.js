import React, { useRef, useState, useEffect } from "react";
import {
  Stage,
  Layer,
  Image,
  Line,
  Text,
  Rect,
  Group,
  Transformer,
} from "react-konva";
import useImage from "use-image";

// Ruler component to draw horizontal and vertical rulers
const Ruler = ({ x, y, width, height, orientation }) => {
  const marks = [];
  for (
    let i = 0;
    i < (orientation === "horizontal" ? width : height);
    i += 10
  ) {
    marks.push(
      <Line
        key={i}
        points={
          orientation === "horizontal"
            ? [x + i, y, x + i, y + 10]
            : [x, y + i, x + 10, y + i]
        }
        stroke="red"
        strokeWidth={1}
      />
    );
    if (i % 50 === 0) {
      marks.push(
        <Text
          key={`label-${i}`}
          text={`${i}`}
          fontSize={8}
          fill="red"
          x={orientation === "horizontal" ? x + i + 2 : x + 12}
          y={orientation === "horizontal" ? y + 12 : y + i - 4}
        />
      );
    }
  }
  return <>{marks}</>;
};

// URLImage component to display and manipulate the uploaded image
const URLImage = ({ src, isSelected, onSelect, onChange, clipArea }) => {
  const [image] = useImage(src);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    if (image) {
      const aspectRatio = image.width / image.height;
      let newWidth = clipArea.width;
      let newHeight = clipArea.height;

      if (aspectRatio > 1) {
        // Wider than taller
        newHeight = clipArea.width / aspectRatio;
        if (newHeight > clipArea.height) {
          newHeight = clipArea.height;
          newWidth = clipArea.height * aspectRatio;
        }
      } else {
        // Taller than wider or square
        newWidth = clipArea.height * aspectRatio;
        if (newWidth > clipArea.width) {
          newWidth = clipArea.width;
          newHeight = clipArea.width / aspectRatio;
        }
      }

      shapeRef.current.width(newWidth);
      shapeRef.current.height(newHeight);
      shapeRef.current.x(clipArea.x + (clipArea.width - newWidth) / 2);
      shapeRef.current.y(clipArea.y + (clipArea.height - newHeight) / 2);
      shapeRef.current.getLayer().batchDraw();
    }
  }, [image]);

  return (
    <>
      <Group
        clipFunc={(ctx) => {
          // Clip to the given area
          ctx.rect(clipArea.x, clipArea.y, clipArea.width, clipArea.height);
        }}
      >
        <Image
          image={image}
          ref={shapeRef}
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={(e) => {
            onChange({
              x: e.target.x(),
              y: e.target.y(),
              width: e.target.width(),
              height: e.target.height(),
            });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            onChange({
              x: node.x(),
              y: node.y(),
              width: Math.max(10, node.width() * node.scaleX()),
              height: Math.max(10, node.height() * node.scaleY()),
            });
          }}
        />
        {isSelected && <Transformer ref={trRef} />}
      </Group>
    </>
  );
};

// Main EditorCanvas component
const EditorCanvas = ({ baseImage, logo }) => {
  const [logoProps, setLogoProps] = useState({
    x: 100,
    y: 100,
    width: 150,
    height: 150,
  });
  const [selectedId, setSelectedId] = useState(null);
  const [base] = useImage(baseImage);
  const [isHovered, setIsHovered] = useState(false); // State to track mouse hover

  const clipArea = {
    x: 290,
    y: 210,
    width: 170,
    height: 230,
  };

  const handleDeselect = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  return (
    <div style={{ position: "relative", width: "750px", margin: "auto" }}>
      <Stage
        width={750}
        height={500}
        onMouseDown={handleDeselect}
        onTouchStart={handleDeselect}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ background: "#ddd", border: "1px solid black" }}
      >
        <Layer>
          <Image image={base} width={750} height={500} />
          {/* <Ruler x={0} y={0} width={750} height={20} orientation="horizontal" />
          <Ruler x={0} y={0} width={20} height={500} orientation="vertical" /> */}
          {isHovered && (
            <>
              <Rect
                x={clipArea.x}
                y={clipArea.y}
                width={clipArea.width}
                height={clipArea.height}
                fill="rgba(0, 0, 0, 0.2)"
                stroke="red"
                strokeWidth={2}
                cornerRadius={5}
              />
              {/* <Ruler
                x={clipArea.x}
                y={clipArea.y}
                width={clipArea.width}
                height={clipArea.height}
                orientation="horizontal"
              />
              <Ruler
                x={clipArea.x}
                y={clipArea.y}
                width={clipArea.width}
                height={clipArea.height}
                orientation="vertical"
              /> */}
            </>
          )}
          {logo && (
            <URLImage
              src={logo}
              isSelected={logoProps === selectedId}
              onSelect={() => setSelectedId(logoProps)}
              onChange={(newProps) => setLogoProps(newProps)}
              clipArea={clipArea} // Pass the clipping area to the URLImage component
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default EditorCanvas;
