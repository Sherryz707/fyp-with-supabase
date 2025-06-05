// import { useGLTF, Center } from "@react-three/drei";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// const RewardModel = ({ name, type = "glb", scale = 1 }) => {
//   const { scene } = useGLTF(
//     `https://raw.githubusercontent.com/Sherryz707/decor_room_builded/main/public/items/${name}`
//   );

//   const ref = useRef();

//   // Auto rotate
//   useFrame((_, delta) => {
//     if (ref.current) {
//       ref.current.rotation.y += delta * 0.5; // rotate slowly
//     }
//   });

//   return (
//     <Center>
//       <primitive object={scene} ref={ref} scale={[scale, scale, scale]} />
//     </Center>
//   );
// };

// export default RewardModel;
// import { useGLTF, Bounds } from "@react-three/drei";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// const RewardModel = ({ name, type = "glb", scale = 1 }) => {
//   const { scene } = useGLTF(
//     `https://raw.githubusercontent.com/Sherryz707/decor_room_builded/main/public/items/${name}`
//   );

//   const ref = useRef();

//   // Auto rotate
//   useFrame((_, delta) => {
//     if (ref.current) {
//       ref.current.rotation.y += delta * 0.5;
//     }
//   });

//   return (
//     <Bounds fit clip observe margin={1.2}>
//       <group ref={ref} scale={[scale, scale, scale]}>
//         <primitive object={scene} />
//       </group>
//     </Bounds>
//   );
// };

// export default RewardModel;
// import { useGLTF, Bounds, Center } from "@react-three/drei";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// const RewardModel = ({ name, type = "glb", scale = 1 }) => {
//   const { scene } = useGLTF(
//     `https://raw.githubusercontent.com/Sherryz707/Storage/main/rewards/${name}`
//   );

//   const ref = useRef();

//   // Auto rotate
//   useFrame((_, delta) => {
//     if (ref.current) {
//       ref.current.rotation.y += delta * 0.5;
//     }
//   });

//   return (
//     <Bounds fit observe={false} clip margin={5}>
//       <Center>
//         <group ref={ref} scale={[scale, scale, scale]}>
//           <primitive object={scene} />
//         </group>
//       </Center>
//     </Bounds>
//   );
// };

// export default RewardModel;
import { useGLTF, Bounds, Center } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const RewardModel = ({ name, type = "glb", scale = 1 }) => {
  const { scene } = useGLTF(
    `https://raw.githubusercontent.com/Sherryz707/decor_room_builded/main/public/items/${name}.${type}`
  );

  const ref = useRef();

  // Leva controls for position offset
  const { posX, posY, posZ } = useControls("Model Position", {
    posX: { value: 0, min: -2, max: 2, step: 0.01 },
    posY: { value: 0, min: -2, max: 2, step: 0.01 },
    posZ: { value: 0, min: -2, max: 2, step: 0.01 },
  });

  // Auto rotate
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Center>
      <group ref={ref} scale={[scale, scale, scale]} position={[0, posY, 0]}>
        <primitive object={scene} />
      </group>
    </Center>
  );
};

export default RewardModel;
