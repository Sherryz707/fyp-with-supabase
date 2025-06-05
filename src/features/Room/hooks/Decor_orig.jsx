import React, { createContext, useContext, useEffect, useReducer } from "react";
import * as THREE from "three";
import pathfinding from "pathfinding";
// Initial state
const items = {
  washer: {
    name: "washer",
    size: [2, 2],
    type: "glb",
  },
  toiletSquare: {
    name: "toiletSquare",
    size: [2, 2],
    type: "glb",
  },
  trashcan: {
    name: "trashcan",
    size: [1, 1],
    type: "glb",
  },
  bathroomCabinetDrawer: {
    name: "bathroomCabinetDrawer",
    size: [2, 2],
    type: "glb",
  },
  bathtub: {
    name: "bathtub",
    size: [4, 2],
    type: "glb",
  },
  bathroomMirror: {
    name: "bathroomMirror",
    size: [2, 1],
    wall: true,
    type: "glb",
  },
  bathroomCabinet: {
    name: "bathroomCabinet",
    size: [2, 1],
    wall: true,
    type: "glb",
  },
  bathroomSink: {
    name: "bathroomSink",
    size: [2, 2],
    type: "glb",
  },
  showerRound: {
    name: "showerRound",
    size: [2, 2],
    type: "glb",
  },
  tableCoffee: {
    name: "tableCoffee",
    size: [4, 2],
    type: "glb",
  },
  loungeSofaCorner: {
    name: "loungeSofaCorner",
    size: [5, 5],
    type: "glb",
  },
  bear: {
    name: "bear",
    size: [2, 1],
    wall: true,
    type: "glb",
  },
  loungeSofaOttoman: {
    name: "loungeSofaOttoman",
    size: [2, 2],
    type: "glb",
  },
  tableCoffeeGlassSquare: {
    name: "tableCoffeeGlassSquare",
    size: [2, 2],
    type: "glb",
  },
  loungeDesignSofaCorner: {
    name: "loungeDesignSofaCorner",
    size: [5, 5],
    type: "glb",
  },
  loungeDesignSofa: {
    name: "loungeDesignSofa",
    size: [5, 2],
    type: "glb",
  },
  loungeSofa: {
    name: "loungeSofa",
    size: [5, 2],
    type: "glb",
  },
  bookcaseOpenLow: {
    name: "bookcaseOpenLow",
    size: [2, 1],
    type: "glb",
  },
  kitchenBar: {
    name: "kitchenBar",
    size: [2, 1],
    type: "glb",
  },
  bookcaseClosedWide: {
    name: "bookcaseClosedWide",
    size: [3, 1],
    type: "glb",
  },
  bedSingle: {
    name: "bedSingle",
    size: [3, 5],
    type: "glb",
  },
  bench: {
    name: "bench",
    size: [2, 1],
    type: "glb",
  },
  bedDouble: {
    name: "bedDouble",
    size: [5, 5],
    type: "glb",
  },
  benchCushionLow: {
    name: "benchCushionLow",
    size: [2, 1],
    type: "glb",
  },
  loungeChair: {
    name: "loungeChair",
    size: [2, 2],
    type: "glb",
  },
  cabinetBedDrawer: {
    name: "cabinetBedDrawer",
    size: [1, 1],
    type: "glb",
  },
  cabinetBedDrawerTable: {
    name: "cabinetBedDrawerTable",
    size: [1, 1],
    type: "glb",
  },
  table: {
    name: "table",
    size: [4, 2],
    type: "glb",
  },
  tableCrossCloth: {
    name: "tableCrossCloth",
    size: [4, 2],
    type: "glb",
  },
  plant: {
    name: "plant",
    size: [1, 1],
    type: "glb",
  },
  plantSmall: {
    name: "plantSmall",
    size: [1, 1],
    type: "glb",
  },
  rugRounded: {
    name: "rugRounded",
    size: [6, 4],
    walkable: true,
    type: "glb",
  },
  rugRound: {
    name: "rugRound",
    size: [4, 4],
    walkable: true,
    type: "glb",
  },
  rugSquare: {
    name: "rugSquare",
    size: [4, 4],
    walkable: true,
    type: "glb",
  },
  rugRectangle: {
    name: "rugRectangle",
    size: [8, 4],
    walkable: true,
    type: "glb",
  },
  televisionVintage: {
    name: "televisionVintage",
    size: [4, 2],
    type: "glb",
  },
  televisionModern: {
    name: "televisionModern",
    size: [4, 2],
    type: "glb",
  },
  kitchenCabinetCornerRound: {
    name: "kitchenCabinetCornerRound",
    size: [2, 2],
    type: "glb",
  },
  kitchenCabinetCornerInner: {
    name: "kitchenCabinetCornerInner",
    size: [2, 2],
    type: "glb",
  },
  kitchenCabinet: {
    name: "kitchenCabinet",
    size: [2, 2],
    type: "glb",
  },
  kitchenBlender: {
    name: "kitchenBlender",
    size: [1, 1],
    type: "glb",
  },
  dryer: {
    name: "dryer",
    size: [2, 2],
    type: "glb",
  },
  chairCushion: {
    name: "chairCushion",
    size: [1, 1],
    type: "glb",
  },
  chair: {
    name: "chair",
    size: [1, 1],
    type: "glb",
  },
  deskComputer: {
    name: "deskComputer",
    size: [3, 2],
    type: "glb",
  },
  desk: {
    name: "desk",
    size: [3, 2],
    type: "glb",
  },
  chairModernCushion: {
    name: "chairModernCushion",
    size: [1, 1],
    type: "glb",
  },
  chairModernFrameCushion: {
    name: "chairModernFrameCushion",
    size: [1, 1],
    type: "glb",
  },
  kitchenMicrowave: {
    name: "kitchenMicrowave",
    size: [1, 1],
    type: "glb",
  },
  coatRackStanding: {
    name: "coatRackStanding",
    size: [1, 1],
    type: "glb",
  },
  kitchenSink: {
    name: "kitchenSink",
    size: [2, 2],
    type: "glb",
  },
  lampRoundFloor: {
    name: "lampRoundFloor",
    size: [1, 1],
    type: "glb",
  },
  lampRoundTable: {
    name: "lampRoundTable",
    size: [1, 1],
    type: "glb",
  },
  lampSquareFloor: {
    name: "lampSquareFloor",
    size: [1, 1],
    type: "glb",
  },
  lampSquareTable: {
    name: "lampSquareTable",
    size: [1, 1],
    type: "glb",
  },
  toaster: {
    name: "toaster",
    size: [1, 1],
    type: "glb",
  },
  kitchenStove: {
    name: "kitchenStove",
    size: [2, 2],
    type: "glb",
  },
  laptop: {
    name: "laptop",
    size: [1, 1],
    type: "glb",
  },
  radio: {
    name: "radio",
    size: [1, 1],
    type: "glb",
  },
  speaker: {
    name: "speaker",
    size: [1, 1],
    type: "glb",
  },
  speakerSmall: {
    name: "speakerSmall",
    size: [1, 1],
    type: "glb",
  },
  stoolBar: {
    name: "stoolBar",
    size: [1, 1],
    type: "glb",
  },
  stoolBarSquare: {
    name: "stoolBarSquare",
    size: [1, 1],
    type: "glb",
  },
};

const initialState = {
  position: [0, 0, 0],
  map: {
    size: [10, 10],
    gridDivision: 2,
    // items: [
    //   {
    //     ...items.showerRound,
    //     gridPosition: [0, 0],
    //   },
    //   {
    //     ...items.toiletSquare,
    //     gridPosition: [0, 3],
    //     rotation: 1,
    //   },
    //   {
    //     ...items.washer,
    //     gridPosition: [5, 0],
    //   },
    //   {
    //     ...items.bathroomSink,
    //     gridPosition: [7, 0],
    //   },
    //   {
    //     ...items.trashcan,
    //     gridPosition: [0, 5],
    //     rotation: 1,
    //   },
    //   {
    //     ...items.bathroomCabinetDrawer,
    //     gridPosition: [3, 0],
    //   },
    //   {
    //     ...items.bathtub,
    //     gridPosition: [4, 4],
    //   },
    //   {
    //     ...items.bathtub,
    //     gridPosition: [0, 8],
    //     rotation: 3,
    //   },
    //   {
    //     ...items.bathroomCabinet,
    //     gridPosition: [3, 0],
    //   },
    //   {
    //     ...items.bathroomMirror,
    //     gridPosition: [0, 8],
    //     rotation: 1,
    //   },
    //   {
    //     ...items.bathroomMirror,
    //     gridPosition: [, 10],
    //     rotation: 1,
    //   },
    //   {
    //     ...items.tableCoffee,
    //     gridPosition: [10, 8],
    //   },
    //   {
    //     ...items.rugRectangle,
    //     gridPosition: [8, 7],
    //   },
    //   {
    //     ...items.loungeSofaCorner,
    //     gridPosition: [6, 10],
    //   },
    //   {
    //     ...items.bear,
    //     gridPosition: [0, 3],
    //     rotation: 1,
    //   },
    //   {
    //     ...items.plant,
    //     gridPosition: [11, 13],
    //   },
    //   {
    //     ...items.cabinetBedDrawerTable,
    //     gridPosition: [13, 19],
    //   },
    //   {
    //     ...items.cabinetBedDrawer,
    //     gridPosition: [19, 19],
    //   },
    //   {
    //     ...items.bedDouble,
    //     gridPosition: [14, 15],
    //   },
    //   {
    //     ...items.bookcaseClosedWide,
    //     gridPosition: [12, 0],
    //     rotation: 2,
    //   },
    //   {
    //     ...items.speaker,
    //     gridPosition: [11, 0],
    //   },
    //   {
    //     ...items.speakerSmall,
    //     gridPosition: [15, 0],
    //   },
    //   {
    //     ...items.loungeChair,
    //     gridPosition: [10, 4],
    //   },
    //   {
    //     ...items.loungeSofaOttoman,
    //     gridPosition: [14, 4],
    //   },
    //   {
    //     ...items.loungeDesignSofa,
    //     gridPosition: [18, 0],
    //     rotation: 1,
    //   },
    //   {
    //     ...items.kitchenCabinetCornerRound,
    //     gridPosition: [2, 18],
    //     rotation: 2,
    //   },
    //   {
    //     ...items.kitchenCabinetCornerInner,
    //     gridPosition: [0, 18],
    //     rotation: 2,
    //   },
    //   {
    //     ...items.kitchenStove,
    //     gridPosition: [0, 16],
    //     rotation: 1,
    //   },
    //   {
    //     ...items.dryer,
    //     gridPosition: [0, 14],
    //     rotation: 1,
    //   },
    //   {
    //     ...items.lampRoundFloor,
    //     gridPosition: [0, 12],
    //   },
    // ],
    items: [],
  },
  items,
  path: null,
  grid: null,
  inventoryShop: [],
};
// Initialize the grid after `initialState` is defined
initialState.grid = new pathfinding.Grid(
  initialState.map.size[0] * initialState.map.gridDivision,
  initialState.map.size[1] * initialState.map.gridDivision
);

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    // equiz to socket.on('move')
    case "SET_POSITION":
      return { ...state, position: action.payload };
    case "SET_PATH":
      return { ...state, path: action.payload };
    // case "SET_ITEMS":
    //   return {...state,inventoryShop:[...state.inventoryShop,
    //     ...(Array.isArray(action.payload) ? action.payload : [action.payload])]}
    case "SET_ITEMS":
      return {
        ...state,
        map: {
          ...state.map,
          items: [
            ...state.map.items,
            ...(Array.isArray(action.payload)
              ? action.payload
              : [action.payload]),
          ],
        },
      };
    case "REMOVE_ITEMS":
      console.log(
        "in reducer case",
        action.payload,
        state.map.items.filter(
          (item) =>
            item.name !== action.payload.name ||
            item.gridPosition[0] !== action.payload.gridPosition[0] ||
            item.gridPosition[1] !== action.payload.gridPosition[1] ||
            item.rotation !== action.payload.rotation
        )
      );
      return {
        ...state,
        map: {
          ...state.map,
          items: state.map.items.filter(
            (item) =>
              !(
                item.name === action.payload.name &&
                item.gridPosition[0] === action.payload.gridPosition[0] &&
                item.gridPosition[1] === action.payload.gridPosition[1] &&
                item.rotation === action.payload.rotation
              )
          ),
        },
      };
    // You can add more cases here as you expand functionality
    default:
      return state;
  }
};

// Create context
const DecorContext = createContext();

const finder = new pathfinding.AStarFinder({
  allowDiagonal: true,
  dontCrossCorners: true,
});
// Provider component
export const DecorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("use effect in context prov");
    dispatch({ type: "SET_POSITION", payload: generateRandomPosition() });
    updateGrid(); // Update the UI with the new grid data
  }, []);
  // useEffect(()=>{setPosition(generateRandomPosition())},[])
  // setPosition function to dispatch action
  const setInvItems = (items) => {
    dispatch({ type: "SET_POSITION", payload: items });
  };
  const findPath = (start, end) => {
    const gridClone = state.grid.clone();
    // const gridClone=state.grid
    const path = finder.findPath(start[0], start[1], end[0], end[1], gridClone);
    return path;
  };
  const setPosition = (from, to) => {
    console.log("start set pos", from, to);
    const path = findPath(from, to);
    console.log("paths", path);
    if (!path) {
      return;
    }
    console.log("positions", from, to);
    // position=new THREE.Vector3(position[0],position[1],position[2])
    dispatch({ type: "SET_POSITION", payload: from });
    dispatch({ type: "SET_PATH", payload: path });
  };

  const updateGrid = () => {
    if (state.map.items.length == 0) return;
    state.map.items.forEach((item) => {
      if (item.walkable || item.wall) {
        return;
      }
      const width =
        item.rotation === 1 || item.rotation === 3
          ? item.size[1]
          : item.size[0];
      const height =
        item.rotation === 1 || item.rotation === 3
          ? item.size[0]
          : item.size[1];
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          state.grid.setWalkableAt(
            item.gridPosition[0] + x,
            item.gridPosition[1] + y,
            false
          );
        }
      }
    });
  };
  const updateItems = (items) => {
    dispatch({ type: "SET_ITEMS", payload: items });
    updateGrid();
  };
  const deleteItems = (items) => {
    console.log("DELETE ITEMS", items);
    dispatch({ type: "REMOVE_ITEMS", payload: items });
    updateGrid();
  };
  // updateGrid()
  const generateRandomPosition = () => {
    console.log("in generated random pos");
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(
        Math.random() * state.map.size[0] * state.map.gridDivision
      );
      const y = Math.floor(
        Math.random() * state.map.size[1] * state.map.gridDivision
      );

      if (state.grid.isWalkableAt(x, y)) {
        return [x, y];
      }
    }
  };
  return (
    <DecorContext.Provider
      value={{
        state,
        dispatch,
        deleteItems,
        updateItems,
        generateRandomPosition,
        setPosition,
        findPath,
        setInvItems,
      }}
    >
      {children}
    </DecorContext.Provider>
  );
};

// Custom hook to use the position
export const useDecor = () => {
  const context = useContext(DecorContext);
  if (!context) {
    throw new Error("useDecor must be used within a DecorProvider");
  }
  return context;
};
