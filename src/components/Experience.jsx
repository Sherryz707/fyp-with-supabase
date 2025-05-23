import React from "react";

import { NoToneMapping } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva"; // Import useControls from Leva
import Model from "./Model";

export default function Experience({ selectedAnswer, model }) {
  console.log("in exp", selectedAnswer);
  // Use Leva for light controls
  const ambientLightSettings = useControls("Ambient Light", {
    intensity: { value: 3.2, min: 0, max: 5, step: 0.1 },
  });

  const directionalLightSettings = useControls("Directional Light", {
    intensity: { value: 0.3, min: 0, max: 5, step: 0.1 },
    x: { value: 0, min: -10, max: 10, step: 0.1 },
    y: { value: 5, min: -10, max: 10, step: 0.1 },
    z: { value: 5, min: -10, max: 10, step: 0.1 },
  });

  const pointLightSettings = useControls("Yellow Point Light", {
    intensity: { value: 2, min: 0, max: 5, step: 0.1 },
    x: { value: 2, min: -10, max: 10, step: 0.1 },
    y: { value: 3, min: -10, max: 10, step: 0.1 },
    z: { value: 1, min: -10, max: 10, step: 0.1 },
  });

  return (
    <div className="h-screen w-screen">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ toneMapping: NoToneMapping }}
        linear
      >
        {/* Ambient Light */}
        <ambientLight intensity={ambientLightSettings.intensity} />

        {/* Directional Light */}
        <directionalLight
          intensity={directionalLightSettings.intensity}
          position={[
            directionalLightSettings.x,
            directionalLightSettings.y,
            directionalLightSettings.z,
          ]}
        />

        {/* Yellow Point Light */}
        <pointLight
          intensity={pointLightSettings.intensity}
          position={[
            pointLightSettings.x,
            pointLightSettings.y,
            pointLightSettings.z,
          ]}
        />

        {/* Render the model in the center */}
        <Model selectedAnswer={selectedAnswer} model={model} />
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}
