"use client";

import React, { useState } from "react";
import EditorCanvas from "../components/EditorCanvas";
import UploadLogo from "../components/UploadLogo";

const Home = () => {
  const [logo, setLogo] = useState(null);
  const [logoRemoveBg, setLogoRemoveBg] = useState(null);
  const [removeBackground, setRemoveBackground] = useState(false);

  const handleUpload = async (file) => {
    setLogo(URL.createObjectURL(file));
    try {
      const removedBgLogo = await removeBg(file);
      console.log("removedBgLogo:", removedBgLogo);
      setLogoRemoveBg(URL.createObjectURL(new Blob([removedBgLogo])));
    } catch (error) {
      console.error("Background removal failed:", error);
      setLogoRemoveBg(URL.createObjectURL(file)); // Fallback to original file if removal fails
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Logo Editor</h1>
      <UploadLogo onUpload={handleUpload} />
      <label>
        <input
          type="checkbox"
          checked={removeBackground}
          onChange={(e) => setRemoveBackground(e.target.checked)}
        />
        Remove Background
      </label>
      <EditorCanvas
        baseImage="https://image-proxy-production.swag.com/convert/swag-prod/5e189fc9bb6a612ceab96b52.jpg?format=jpg&height=750"
        logo={removeBackground ? logoRemoveBg : logo}
      />
    </div>
  );
};

async function removeBg(file) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", file);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY },
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

export default Home;
