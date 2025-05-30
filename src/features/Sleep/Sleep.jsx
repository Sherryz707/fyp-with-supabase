import React, { useRef, useState } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Euler, LoopOnce, MathUtils } from "three";
import { useEffect } from "react";
import { useControls } from "leva";
// Lerp function for smooth interpolation
// const lerpMorphTarget = (scene, target, value, speed = 0.1) => {
//   scene.traverse((child) => {
//     if (child.morphTargetDictionary && child.morphTargetInfluences) {
//       const index = child.morphTargetDictionary[target];
//       if (
//         index === undefined ||
//         child.morphTargetInfluences[index] === undefined
//       ) {
//         return;
//       }
//       child.morphTargetInfluences[index] = MathUtils.lerp(
//         child.morphTargetInfluences[index],
//         value,
//         speed
//       );
//     }
//   });
// };
const lerpMorphTarget = (scene, target, value, speed = 0.1) => {
  scene.traverse((child) => {
    if (child.morphTargetDictionary && child.morphTargetInfluences) {
      const index = child.morphTargetDictionary[target];
      if (index === undefined) return;

      const current = child.morphTargetInfluences[index];
      const next = MathUtils.lerp(current, value, speed);

      // If nearly zero, snap to zero to avoid lingering influence
      child.morphTargetInfluences[index] = Math.abs(next) < 0.01 ? 0 : next;
    }
  });
};

export function Model({
  feedbackType,
  gameState,
  count,
  setDisable,
  url,
  reset = false,
  props,
}) {
  const group = useRef();
  const { animations, scene } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  const { position, rotation } = useControls("Cube Controls", {
    position: {
      value: [-53.2, 35.6, -113.8],
      min: -1000,
      max: 1000,
      step: 0.1,
    },
    rotation: {
      value: [1.52, -1.82, 0.11],
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    },
  });
  // useEffect(() => {
  //   if (reset) {
  //     const targetsToReset = ["sleep", "Z-3", "Z-2", "Z-1"];
  //     targetsToReset.forEach((target) => {
  //       lerpMorphTarget(scene, target, 1, 1); // use full speed = 1 for immediate reset
  //     });
  //   }
  // }, [reset]);

  useFrame(({ clock }) => {
    setDisable(true);
    const time = clock.getElapsedTime();
    const hoverAmount = Math.sin(time * 6) * 0.08;

    // Morph targets array in reverse order (assuming Z-3 goes first)
    const morphTargets = ["Z-3", "Z-2", "Z-1"];

    // Loop through targets and apply bobbing only to the ones not yet guessed
    morphTargets.forEach((target, index) => {
      if (count <= index) {
        lerpMorphTarget(scene, target, 1 + hoverAmount, 0.2);
        lerpMorphTarget(scene, "sleep", 1, 0.2);
      }
    });

    // Handle canceling morphs based on count and correct feedback
    if (feedbackType === "correct") {
      if (count === 1) {
        lerpMorphTarget(scene, "Z-3", 0, 0.1);
      } else if (count === 2) {
        lerpMorphTarget(scene, "Z-2", 0, 0.1);
      } else if (count === 3) {
        lerpMorphTarget(scene, "Z-1", 0, 0.1);
        lerpMorphTarget(scene, "sleep", 0, 0.1);
      }
    }
    setDisable(false);
  });

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      {...props}
    />
  );
}

useGLTF.preload("/models/Sherryz707/Storage/main/sleep/sleep-A.glb");
useGLTF.preload("/models/Sherryz707/Storage/main/sleep/sleep-B.glb");
useGLTF.preload("/models/Sherryz707/Storage/main/sleep/sleep-C.glb");
useGLTF.preload("/models/Sherryz707/Storage/main/sleep/sleep-One.glb");
useGLTF.preload("/models/Sherryz707/Storage/main/sleep/sleep-Two.glb");
useGLTF.preload("/models/Sherryz707/Storage/main/sleep/sleep-Three.glb");
