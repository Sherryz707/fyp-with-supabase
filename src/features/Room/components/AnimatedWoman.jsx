/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
new THREE.Vector3(state.pos[0],....)
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useDecor } from "../hooks/Decor";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGrid } from "../hooks/useGrid";

const MOVEMENT_SPEED = 0.032;
export function AnimatedWoman({
  hairColor = "green",
  topColor = "pink",
  bottomColor = "brown",
  ...props
}) {
  const position = useMemo(() => props.position, []);
  const [path, setPath] = useState();
  const { gridToVector3 } = useGrid();
  useEffect(() => {
    const path = [];
    props.path?.forEach((gridPosition) => {
      path.push(gridToVector3(gridPosition));
      setPath(path);
    });
  }, [props.path]);
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "https://raw.githubusercontent.com/Sherryz707/decor_room_builded/main/public/models/Animated Woman.glb"
  );

  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("CharacterArmature|Idle");

  useEffect(() => {
    actions[animation].reset().fadeIn(0.32).play();
    return () => actions[animation]?.fadeOut(0.32);
  }, [animation]);

  useFrame((state) => {
    if (path?.length && group.current.position.distanceTo(path[0]) > 0.1) {
      const direction = group.current.position
        .clone()
        .sub(path[0])
        .normalize()
        .multiplyScalar(MOVEMENT_SPEED);
      group.current.position.sub(direction);
      group.current.lookAt(path[0]);
      setAnimation("CharacterArmature|Run");
    } else if (path?.length) {
      path.shift();
    } else {
      setAnimation("CharacterArmature|Idle");
    }
    state.camera.position.x = group.current.position.x + 8;
    state.camera.position.x = group.current.position.y + 8;
    state.camera.position.x = group.current.position.z + 8;
    state.camera.lookAt(group.current.position);
  });

  return (
    <group
      ref={group}
      {...props}
      position={position}
      dispose={null}
      name={"main_character"}
    >
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <group name="Casual_Body" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Casual_Body_1"
              geometry={nodes.Casual_Body_1.geometry}
              material={materials.White}
              skeleton={nodes.Casual_Body_1.skeleton}
              castShadow
            >
              <meshStandardMaterial color={topColor} />
            </skinnedMesh>
            <skinnedMesh
              name="Casual_Body_2"
              geometry={nodes.Casual_Body_2.geometry}
              material={materials.Skin}
              skeleton={nodes.Casual_Body_2.skeleton}
              castShadow
            />
          </group>
          <group name="Casual_Feet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Casual_Feet_1"
              geometry={nodes.Casual_Feet_1.geometry}
              material={materials.Skin}
              skeleton={nodes.Casual_Feet_1.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Casual_Feet_2"
              geometry={nodes.Casual_Feet_2.geometry}
              material={materials.Grey}
              skeleton={nodes.Casual_Feet_2.skeleton}
              castShadow
            />
          </group>
          <group name="Casual_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Casual_Head_1"
              geometry={nodes.Casual_Head_1.geometry}
              material={materials.Skin}
              skeleton={nodes.Casual_Head_1.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Casual_Head_2"
              geometry={nodes.Casual_Head_2.geometry}
              material={materials.Hair_Blond}
              skeleton={nodes.Casual_Head_2.skeleton}
              castShadow
            >
              <meshStandardMaterial color={hairColor} />
            </skinnedMesh>
            <skinnedMesh
              name="Casual_Head_3"
              geometry={nodes.Casual_Head_3.geometry}
              material={materials.Hair_Brown}
              skeleton={nodes.Casual_Head_3.skeleton}
              castShadow
            />
            <skinnedMesh
              name="Casual_Head_4"
              geometry={nodes.Casual_Head_4.geometry}
              material={materials.Brown}
              skeleton={nodes.Casual_Head_4.skeleton}
              castShadow
            />
          </group>
          <skinnedMesh
            name="Casual_Legs"
            geometry={nodes.Casual_Legs.geometry}
            material={materials.Orange}
            skeleton={nodes.Casual_Legs.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
            castShadow
          >
            <meshStandardMaterial color={bottomColor} />
          </skinnedMesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(
  "https://raw.githubusercontent.com/Sherryz707/decor_room_builded/main/public/models/Animated Woman.glb"
);
