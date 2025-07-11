import { useDecor } from "../hooks/Decor"
import { useUIContext } from "../hooks/UIContext"

export const UI=()=>{
  const {state,setBuildMode,setDraggedItem,setDraggedItemRotation,setShopMode,deleteDraggedItem}=useUIContext()
  const {shopMode,buildMode,draggedItem,draggedItemRotation}=state
   const{deleteItems}=useDecor()
  return (
    <div className="fixed inset-4 flex items-end justify-center pointer-events-none">
      <div className="flex items-center space-x-4 pointer-events-auto">
        {/* BACK */}
        {(buildMode || shopMode) && !draggedItem && (
          <button
            className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
            onClick={() => {
              shopMode ? setShopMode(false) : setBuildMode(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </button>
        )}
        {/* BUILD */}
        {!buildMode && !shopMode && (
          <button
            className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
            onClick={() => setBuildMode(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </button>
        )}
        {/* SHOP */}
        {buildMode && !shopMode && !draggedItem && (
          <button
            className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
            onClick={() => setShopMode(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
          </button>
        )}
        {/* ROTATE */}
        {buildMode && !shopMode && draggedItem && (
          <button
            className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
            onClick={() =>
              setDraggedItemRotation(
                draggedItemRotation === 3 ? 0 : draggedItemRotation + 1
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        )}
        {/* CANCEL */}
        {buildMode && !shopMode && draggedItem && (
          <button
            className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
            onClick={() => {}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {/* TRASH IT */}
        {buildMode && !shopMode && draggedItem && (
          <button
            className="p-4 rounded-full bg-slate-500 text-white drop-shadow-md cursor-pointer hover:bg-slate-800 transition-colors"
            onClick={() => {deleteDraggedItem(draggedItem); setDraggedItem(null);}}
          >
           <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M9 6v12m6-12v12m-9 3h12a2 2 0 002-2V6M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"
              />
            </svg>

          </button>
        )}
      </div>
    </div>
  );
}