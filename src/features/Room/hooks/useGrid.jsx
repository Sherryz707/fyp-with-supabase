import {useDecor} from "./Decor"
import * as THREE from 'three'
export const useGrid=()=>{
    const {state}=useDecor()
    const vector3ToGrid=(vector3)=>{
        return [
            Math.floor(vector3.x*state.map.gridDivision),
            Math.floor(vector3.z*state.map.gridDivision)
        ]
    }
    const gridToVector3=(gridPosition,width=1,height=1)=>{
        return new THREE.Vector3(width/state.map.gridDivision/2+gridPosition[0]/state.map.gridDivision,0,
        width/state.map.gridDivision/2+gridPosition[1]/state.map.gridDivision
        )

    }
    return{
        vector3ToGrid,
        gridToVector3
    }
}