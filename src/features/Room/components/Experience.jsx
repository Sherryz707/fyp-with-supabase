"use client"
import { Environment, Grid, OrbitControls, useCursor } from "@react-three/drei";
import {AnimatedWoman} from "./AnimatedWoman";
import { useEffect, useRef, useState } from "react";
import { useDecor } from "../hooks/Decor";
import { useGrid } from "../hooks/useGrid";
import {Item} from "./Item"
import { useThree } from "@react-three/fiber";
import { useUIContext } from "../hooks/UIContext";
import {Shop} from "./Shop"
const Experience = () => {
  const {state:UIState,setBuildMode,setDraggedItem,setDraggedItemRotation,setShopMode}=useUIContext()
  const {shopMode,buildMode,draggedItem,draggedItemRotation,deletedItem}=UIState
  const {state,setPosition,updateItems,deleteItems}=useDecor()
  // console.log("state",state)

  const [dragPosition,setDragPosition]=useState([0,0])
  const [canDrop,setCanDrop]=useState(false)
  const [items,setItems]=useState(state.map.items)
  useEffect(()=>{
    if(!deletedItem || deletedItem===null){return;}
    console.log("ITEM TO DELTE",deletedItem,items[deletedItem])
    deleteItems(items[deletedItem])
    // Update local state
  setItems((prev) =>
    prev.filter(
      item =>
        !(
          item.name === deletedItem.name &&
          item.gridPosition[0] === deletedItem.gridPosition[0] &&
          item.gridPosition[1] === deletedItem.gridPosition[1] &&
          item.rotation === deletedItem.rotation
        )
    )
  );
  },[deletedItem])
  useEffect(()=>{
    if(!draggedItem || draggedItem===null){return;}
    // console.log("in useeffect",draggedItem,"space",items[draggedItem])
    const item=items[draggedItem]
    const width=draggedItemRotation===1||draggedItemRotation===3?item.size[1]:item.size[0]
    const height=draggedItemRotation===1||draggedItemRotation===3?item.size[0]:item.size[1]

    let droppable=true;

    //check if item is in bounds
    if(dragPosition[0]<0||dragPosition[0]+width>state.map.size[0]*state.map.gridDivision){
      droppable=false
    }
    if(dragPosition[1]<0||dragPosition[1]+height>state.map.size[1]*state.map.gridDivision){
      droppable=false
    }
   

    // check collisions with others
    if(!item.walkable && !item.wall){
      items.forEach((otherItem,idx)=>{
        // ignore self
        if(idx===draggedItem){
          return;
        }
        // ignore wall and floor
        if(otherItem.walkable||otherItem.wall){
          return;
        }
        //check item overlap
        const otherWidth=otherItem.rotation===1||otherItem.rotation===3?otherItem.size[1]:otherItem.size[0];
        const otherHeight=otherItem.rotation===1||otherItem.rotation==3?otherItem.size[0]:otherItem.size[1];
        if(dragPosition[0] < otherItem.gridPosition[0] + otherWidth &&
          dragPosition[0] + width > otherItem.gridPosition[0] &&
          dragPosition[1] < otherItem.gridPosition[1] + otherHeight &&
          dragPosition[1] + height > otherItem.gridPosition[1]){
          droppable=false
        }
      })
    }
    setCanDrop(droppable)
  },[dragPosition,draggedItem,items,draggedItemRotation])


  const [onFloor,setOnFloor]=useState(false);
  useCursor(onFloor?'pointer':'auto')
  const {vector3ToGrid,gridToVector3}=useGrid()
  const scene=useThree((state)=>state.scene)
  const onPlaneClicked=(e)=>{
    if(!buildMode){
      const character=scene.getObjectByName('main_character')
      console.log("my character",character)
      if(!character){
        return;
      }
      setPosition(vector3ToGrid(character.position),vector3ToGrid(e.point))
    }else{
      if(draggedItem!==null){
        if(canDrop){
          setItems((prev)=>{
            const newItems=[...prev];
            delete newItems[draggedItem].tmp;
            newItems[draggedItem].gridPosition=vector3ToGrid(e.point)
            newItems[draggedItem].rotation=draggedItemRotation;
            return newItems
          });
        }
        setDraggedItem(null)
      }
    }
  }
  // Shop LOgic 
  const onItemSelected=(item)=>{
    setShopMode(false);
    setItems((prev)=>[
      ...prev,{
        ...item,
        gridPosition:[0,0],
        tmp:true
      }
    ])
    setDraggedItem(items.length);
    setDraggedItemRotation(0);
  }
  useEffect(()=>{
    if(draggedItem===null){
      setItems((prev)=>prev.filter((item)=>!item.tmp))
    }
  },[draggedItem])
  const controls=useRef()
  const stateCam = useThree((state) => state);
  useEffect(()=>{
    if(buildMode){
      setItems(state.map?.items||[]);
      stateCam.camera.position.set(8,8,8);
      controls.current.target.set(0,0,0);
    }else{
      // TODO: update items in DB
      updateItems(items)
    }
  },[buildMode])
  useEffect(()=>{
    if(shopMode){
     stateCam.camera.position.set(0,4,8);
      controls.current.target.set(0,0,0);
    }else{
     stateCam.camera.position.set(8,8,8);
      controls.current.target.set(0,0,0);
    }
  },[shopMode])
  return (
    <>
    <Environment preset="sunset"/>
    <ambientLight intensity={0.1}/>
    <directionalLight position={[-4,4,-4]} castShadow intensity={0.35} shadow-mapSize={[1024,1024]}>
      <orthographicCamera attach={"shadow-camera"} args={[-state.map.size[0],state.map.size[1],10,-10]} far={state.map.size[0]+state.map.size[1]}/>
    </directionalLight>
    <OrbitControls ref={controls} minDistance={5} maxDistance={20} minPolarAngle={0} maxPolarAngle={Math.PI/2} screenSpacePanning={false} enableZoom={!shopMode}/>
    {shopMode && <Shop onItemSelected={onItemSelected}/>}
    {
      !shopMode && (buildMode?items:state.map.items).map((item,idx)=>(
        <Item key={`${item.name}-${idx}`} dragRotation={draggedItemRotation} item={item} map={state.map} onClick={()=>{if(buildMode){setDraggedItem(draggedItem===null?idx:draggedItem);setDraggedItemRotation(item.rotation||0)}}} isDragging={draggedItem===idx} dragPosition={dragPosition} canDrop={canDrop}/>
      ))
    }

    {!shopMode && <mesh receiveShadow rotation-x={-Math.PI/2} position-x={state.map.size[0]/2} position-z={state.map.size[1]/2} position-y={-0.002} onClick={onPlaneClicked} onPointerEnter={()=>setOnFloor(true)} onPointerLeave={()=>setOnFloor(false)} onPointerMove={(e) => {
          if (!buildMode) {
            return;
          }
          const newPosition = vector3ToGrid(e.point);
          if (
            !dragPosition ||
            newPosition[0] !== dragPosition[0] ||
            newPosition[1] !== dragPosition[1]
          ) {
            setDragPosition(newPosition);
          }
        }}>
        <planeGeometry args={state.map.size}/>
      <meshStandardMaterial color="#f0f0f0"/>
    </mesh>}
    {buildMode && !shopMode && <Grid infiniteGrid fadeDistance={50} fadeStrength={5}/>}
    {!buildMode && <AnimatedWoman  
          key="meow"
          path={state.path}
          position={
            gridToVector3(state.position)
          }/>}
    </>
  );
};

export default Experience