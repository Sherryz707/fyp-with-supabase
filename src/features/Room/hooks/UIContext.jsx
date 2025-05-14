import React, { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  deletedItem:null,
  shopMode: false,
  buildMode:false,
  draggedItem:null,
  draggedItemRotation:0 // Placeholder state variable
  // Add more properties as needed
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SHOP_MODE":
      return { ...state, shopMode: action.payload };
    case "SET_BUILD_MODE":
      return { ...state, buildMode: action.payload };
    case "SET_DRAGGED_ITEM":
      return { ...state, draggedItem: action.payload };
    case "SET_DRAGGED_ITEM_ROTATION":
      return { ...state, draggedItemRotation: action.payload };
    case "DELETE_DRAGGED_ITEM":
      return { ...state, deletedItem: action.payload };
    default:
      return state;
  }
};

// Create Context
const UIContext = createContext();

// Provider Component
export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setShopMode = (value) => {
    dispatch({ type: "SET_SHOP_MODE", payload: value });
  };
  
  const setBuildMode = (value) => {
    dispatch({ type: "SET_BUILD_MODE", payload: value });
  };
  
  const setDraggedItem = (item) => {
    dispatch({ type: "SET_DRAGGED_ITEM", payload: item });
  };
  
  const setDraggedItemRotation = (rotation) => {
    dispatch({ type: "SET_DRAGGED_ITEM_ROTATION", payload: rotation });
  };

  const deleteDraggedItem=(item)=>{
    dispatch({ type: "DELETE_DRAGGED_ITEM", payload: item });
  }

  return (
    <UIContext.Provider value={{ state, setBuildMode,deleteDraggedItem,setDraggedItem,setDraggedItemRotation,setShopMode }}>
      {children}
    </UIContext.Provider>
  );
};

// Custom hook for using the context
export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};