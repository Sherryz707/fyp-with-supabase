// import React, { useEffect, useRef } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";

// export function Astronaut({ hovered, model, ...props }) {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF(model);
//   const { actions } = useAnimations(animations, group);
//   useEffect(() => {
//     const anim = hovered ? "wave" : "moon_walk";
//     actions[anim].reset().fadeIn(0.5).play();
//     return () => actions[anim].fadeOut(0.5);
//   }, [hovered]);
//   return <primitive />;
// }
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function ModelRelated({ hovered, model, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(model);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions) return;

    // const anim = hovered ? "wave" : "moon_walk";

    // // Check if the requested animation exists
    // if (actions[anim]) {
    //   actions[anim].reset().fadeIn(0.5).play();

    //   // Cleanup function
    //   return () => {
    //     if (actions[anim]) {
    //       actions[anim].fadeOut(0.5);
    //     }
    //   };
    // } else {
    //   console.warn(`Animation "${anim}" not found in model`);
    // }
  }, [hovered, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.scene} />
    </group>
  );
}

// Preload the model (optional but recommended)
// useGLTF.preload('https://raw.githubusercontent.com/your-model.glb');
