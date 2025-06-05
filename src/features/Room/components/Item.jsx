import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGrid } from "../hooks/useGrid";
export const Item = ({
  item,
  map,
  onClick,
  isDragging,
  dragPosition,
  canDrop,
  dragRotation,
}) => {
  const { name, gridPosition, size, type, rotation: itemRotation } = item;
  const rotation = isDragging ? dragRotation : itemRotation;
  console.log("the type of the model", type);
  const { gridToVector3 } = useGrid();
  const { scene } = useGLTF(
    `https://raw.githubusercontent.com/Sherryz707/decor_room_builded/main/public/items/${name}.${type}`
  );
  // cloning to show render
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const width = rotation === 1 || rotation === 3 ? size[1] : size[0];
  const height = rotation === 1 || rotation === 3 ? size[0] : size[1];

  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);
  return (
    <group
      onClick={onClick}
      position={gridToVector3(
        isDragging ? dragPosition || gridPosition : gridPosition,
        width,
        height
      )}
    >
      <primitive object={clone} rotation-y={((rotation || 0) * Math.PI) / 2} />
      {isDragging && (
        <mesh>
          <boxGeometry
            args={[width / map.gridDivision, 0.2, height / map.gridDivision]}
          />
          <meshBasicMaterial
            color={canDrop ? "green" : "red"}
            opacity={0.3}
            transparent
          />
        </mesh>
      )}
    </group>
  );
};
