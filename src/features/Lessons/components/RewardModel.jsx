import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { Gift } from "lucide-react"; // Assuming you're using this for locked rewards

// Example GLTF loader component
export default function RewardModel({ url }) {
  const { scene } = useGLTF(url);
  return (
    <group scale={1.8}>
      <primitive object={scene} />
    </group>
  );
}
