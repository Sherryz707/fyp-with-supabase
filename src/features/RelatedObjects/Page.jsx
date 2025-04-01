import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const RelatedObjects = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [objects, setObjects] = useState([]);
  useCursor(hovered);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    fetch("/dev-data/quizRelatedObject123.json")
      .then((response) => response.json())
      .then((data) => setObjects(data.objects))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active)?.getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      {objects.map(
        ({ name, model, color, texture, position, rotation, scale }) => {
          return (
            <MonsterStage
              key={name}
              name={name}
              color={color}
              texture={texture}
              position={[position.x, position.y, position.z]}
              rotation={[0, rotation?.y || 0, 0]}
              active={active}
              setActive={setActive}
              hovered={hovered}
              setHovered={setHovered}
            ></MonsterStage>
          );
        }
      )}
    </>
  );
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    portalMaterial.current.blend = THREE.MathUtils.lerp(
      portalMaterial.current.blend || 0,
      worldOpen ? 1 : 0,
      delta * 5
    );
  });

  return (
    <group {...props}>
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY="bottom"
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
