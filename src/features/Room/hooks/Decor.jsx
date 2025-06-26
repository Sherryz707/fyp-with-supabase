import React, { createContext, useContext, useEffect, useReducer } from "react";
import * as THREE from "three";
import pathfinding from "pathfinding";
import { fetchAllItems, fetchAllMapItems } from "../../../services/roomService";
import { useAuth } from "../../../context/AuthContext";
// Initial state

const initialState = {
  position: [0, 0, 0],
  map: {
    size: [10, 10],
    gridDivision: 2,
    items: [],
  },
  items: {},
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
    case "LOAD_ITEMS":
      return {
        ...state,
        items: action.payload,
      };

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
          items: Array.isArray(action.payload)
            ? action.payload
            : [action.payload],
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
  const { user } = useAuth();
  useEffect(() => {
    const initialize = async () => {
      const allItems = await fetchAllItems(user.id); // This should return placed items
      const itemDefs = await fetchAllMapItems(user.id); // Optional if items don't include size/type/etc.
      console.log("map items", itemDefs);
      dispatch({ type: "LOAD_ITEMS", payload: allItems }); // this sets state.items as the master item definitions
      dispatch({ type: "SET_ITEMS", payload: itemDefs }); // this sets state.map.items (placed items)
    };

    initialize();
    dispatch({ type: "SET_POSITION", payload: generateRandomPosition() });
    updateGrid();
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
    console.log("setting items", items);
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
