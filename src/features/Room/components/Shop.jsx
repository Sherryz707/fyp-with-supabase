import { useMemo } from "react";
import { useDecor } from "../hooks/Decor";
import { useRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGrid } from "../hooks/useGrid";
import { SkeletonUtils } from "three-stdlib";

const ShopItem = ({ map, item, ...props }) => {
  const { name, size } = item;
  const { scene } = useGLTF(
    `https://raw.githubusercontent.com/Sherryz707/decor_room_builded/main/public/items/${name}.glb`
  );
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { gridToVector3 } = useGrid();

  return (
    <group {...props}>
      <group position={gridToVector3([0, 0], size[0], size[1])}>
        <primitive object={clone} />
      </group>
    </group>
  );
};
export const Shop = ({ onItemSelected }) => {
  const { state } = useDecor();
  const { items, map } = state;
  const maxX = useRef(0);

  const shopItems = useMemo(() => {
    let x = 0;
    return Object.values(items).map((item, index) => {
      const xPos = x;
      x += item.size[0] / map.gridDivision + 1;
      maxX.current = x;
      return (
        <ShopItem
          map={map}
          key={index}
          position-x={xPos}
          item={item}
          onClick={(e) => {
            e.stopPropagation();
            onItemSelected(item);
          }}
        />
      );
    });
  }, [items]);

  const shopContainer = useRef();
  const scrollData = useScroll();
  useFrame(() => {
    shopContainer.current.position.x = -scrollData.offset * maxX.current;
  });
  return <group ref={shopContainer}>{shopItems}</group>;
};
