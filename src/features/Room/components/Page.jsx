import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { DecorProvider } from "../hooks/Decor";
import { UIProvider } from "../hooks/UIContext";
import { UI } from "./UI";
import { ScrollControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { Cross } from "lucide-react";
import { CircleX } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  return (
    <DecorProvider>
      <UIProvider>
        <main className="flex h-screen min-h-screen flex-col">
          {/* Cross Button */}
          <button
            onClick={() => navigate("/profile")}
            className="absolute top-4 right-10 z-50 text-2xl font-bold btn btn-primary btn-circle"
            aria-label="Close"
          >
            <CircleX />
          </button>
          <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
            <color attach="background" args={["#ececec"]} />
            <ScrollControls pages={4}>
              <Experience />
            </ScrollControls>
          </Canvas>
          <UI />
        </main>
      </UIProvider>
    </DecorProvider>
  );
}
