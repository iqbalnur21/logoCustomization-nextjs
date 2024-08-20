import React, { useState } from "react"; 
import Dropzone from "react-dropzone";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";
import axios from "axios";

const LogoEditor = () => {
  const [image, setImage] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [logoSize, setLogoSize] = useState({ width: 100, height: 100 });

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const handleRemoveBackground = async () => {
    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        // {
        //   image_file_b64: image.split(",")[1],
        // },
        {
          headers: { "X-Api-Key": "7MvV7BGpc1MsBCT4m1UXhxuJ" },
          body: {
            image_file: image,
            size: "auto",
          },
        }
      );
      console.log("response:", response);
      const data = JSON.parse(response.config.data);
      console.log("image_file_b64:", { image_file_b64: data.image_file_b64 });
      setImage(`data:image/jpeg;base64,${data.image_file_b64}`);
    } catch (error) {
      console.error("Error removing background:", error);
    }
  };

  return (
    <div>
      <Dropzone
        onDrop={onDrop}
        accept={{
          "image/*": [".png", ".svg"],
          "application/postscript": [".ai"],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>
              Drag & drop a logo here, or click to select one (AI, PNG, SVG)
            </p>
          </div>
        )}
      </Dropzone>

      {image && (
        <Draggable
          position={logoPosition}
          onStop={(e, data) => setLogoPosition({ x: data.x, y: data.y })}
        >
          <Resizable
            width={logoSize.width}
            height={logoSize.height}
            onResize={(e, { size }) => setLogoSize(size)}
          >
            <div
              style={{
                width: logoSize.width,
                height: logoSize.height,
                position: "relative",
              }}
            >
              <img
                src={image}
                alt="Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
              />
            </div>
          </Resizable>
        </Draggable>
      )}

      <button onClick={handleRemoveBackground}>Remove Background</button>
    </div>
  );
};

export default LogoEditor;
