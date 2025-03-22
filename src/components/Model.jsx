import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { LoopOnce, MathUtils } from "three";
import { useControls } from "leva";

// Lerp function for smooth interpolation
const lerpMorphTarget = (scene, target, value, speed = 0.1) => {
  scene.traverse((child) => {
    if (child.morphTargetDictionary && child.morphTargetInfluences) {
      const index = child.morphTargetDictionary[target];
      if (index === undefined || child.morphTargetInfluences[index] === undefined) {
        return;
      }
      child.morphTargetInfluences[index] = MathUtils.lerp(
        child.morphTargetInfluences[index],
        value,
        speed
      );
    }
  });
};

export default function Model({ selectedAnswer,model, ...props }) {
  const group = useRef();
  const { scene, nodes, materials, animations } = useGLTF(model);
  const { actions } = useAnimations(animations, group);
  const [expression, setExpression] = useState("think");
  const prevExpression = useRef(null);

  // Leva controls for position and rotation
  const { posX, posY, posZ, rotX, rotY, rotZ } = useControls({
    posX: { value: 0, min: -5, max: 5, step: 0.1 },
    posY: { value: 1.2, min: -5, max: 5, step: 0.1 },
    posZ: { value: 4.0, min: -5, max: 5, step: 0.1 },
    rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const hoverAmount = Math.sin(time * 6) * 0.07;
    
    if (prevExpression.current !== expression) {
            // Immediately remove the previous expression
            lerpMorphTarget(scene, prevExpression.current, 0, 1);
            prevExpression.current = expression; // Store new expression
          }
    
    lerpMorphTarget(scene, expression, 1 + hoverAmount, 0.2); // Apply new expression
    
    
    if (group.current) {
      group.current.position.set(posX, posY, posZ);
      group.current.rotation.set(rotX, rotY, rotZ);
    }
  });



  useEffect(() => {
    if (!actions) return;
    let newAnim = "think";
    let newExpression = "think";

    if (selectedAnswer === "correct") {
      newAnim = "cheer";
      newExpression = "happy";
    } else if (selectedAnswer === "wrong") {
      newAnim = "angry";
      newExpression = "angry";
    }

    Object.values(actions).forEach((action) => action.fadeOut(0.5));
    if ((newAnim=="angry") && actions[newAnim]) {
      actions[newAnim].reset().fadeIn(0.5).setLoop(LoopOnce, 1).play();
      actions[newAnim].clampWhenFinished = true;
    }else{
      actions[newAnim].reset().fadeIn(0.5).play()
    }

    setExpression(newExpression);
  }, [selectedAnswer, actions]);

  return <primitive ref={group} object={scene} {...props} />;
}
