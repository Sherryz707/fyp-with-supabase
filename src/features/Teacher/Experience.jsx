import { useEffect, useRef, useState } from "react";
import { AnimationMixer, LoopOnce } from "three";
import { useFrame } from "@react-three/fiber";
import {
  loadMixamoAnimation,
  loadMixamoAnimationGlb,
} from "./utils/loadMixamoAnim";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
// import { useRef, useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";
import { VRMUtils } from "@pixiv/three-vrm";
import { NoToneMapping } from "three";
import { MathUtils } from "three";
import { CameraControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { distributePoints } from "./utils/Points";
import ImageInput from "./ImageInput";

const visemeMapping = {
  viseme_PP: "aa",
  viseme_kk: "ih",
  viseme_I: "ee",
  viseme_AA: "aa",
  viseme_O: "oh",
  viseme_U: "ou",
  viseme_FF: "oh",
  viseme_TH: "ih",
};

export function Model({
  currentVrm,
  replayTrigger,
  feedbackType,
  setDisabled,
  setShow,
  setFeedbackType,
  speed = 1.0,
  setSpeed,
  gameOver,
  gameWon,
  setShowEnd,
  setGreetingState,
  animationSet,
  ...props
}) {
  const vrmRef = useRef();
  const expressionManager = currentVrm.expressionManager;

  const initialHipsY = useRef(null);
  const [isRestoringPosition, setIsRestoringPosition] = useState(false);
  const [restoreStartTime, setRestoreStartTime] = useState(null);
  const [positionXz, setPositionX] = useState(0.0); // Track current position of the model
  const [rotationYz, setrotationY] = useState(3.1); // Track current position of the model
  const [expressionArr, setExpressionArr] = useState(null);

  const smoothMoveToLeft = () => {
    let startPositionX = positionXz;
    let targetX = -0.3; // Final position to move to (left)
    let startRotY = rotationYz;
    let targetRotY = 3.3;
    const transitionDuration = 2; // Duration for the transition (in seconds)
    const startTime = performance.now();

    const move = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
      const t = Math.min(elapsedTime / transitionDuration, 1);

      setPositionX(MathUtils.lerp(startPositionX, targetX, t));
      setrotationY(MathUtils.lerp(startRotY, targetRotY, t));

      if (t < 1) {
        requestAnimationFrame(move);
      }
    };

    move();
  };
  const smoothMoveToCenter = () => {
    let startPositionX = positionXz;
    let targetX = 0.0; // Final position to move to (left)
    let startRotY = rotationYz;
    let targetRotY = 3.1;
    const transitionDuration = 2; // Duration for the transition (in seconds)
    const startTime = performance.now();

    const move = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
      const t = Math.min(elapsedTime / transitionDuration, 1);

      setPositionX(MathUtils.lerp(startPositionX, targetX, t));
      setrotationY(MathUtils.lerp(startRotY, targetRotY, t));

      if (t < 1) {
        requestAnimationFrame(move);
      }
    };

    move();
  };
  const AsyncSmoothMoveToCenter = async () => {
    return new Promise((resolve) => {
      let startPositionX = positionXz;
      let targetX = 0.0; // Final position to move to (center)
      let startRotY = rotationYz;
      let targetRotY = 3.1;
      const transitionDuration = 2; // Duration for the transition (in seconds)
      const startTime = performance.now();

      const move = () => {
        const elapsedTime = (performance.now() - startTime) / 1000;
        const t = Math.min(elapsedTime / transitionDuration, 1);

        setPositionX(MathUtils.lerp(startPositionX, targetX, t));
        setrotationY(MathUtils.lerp(startRotY, targetRotY, t));

        if (t < 1) {
          requestAnimationFrame(move);
        } else {
          resolve(); // Resolve the promise when the animation is complete
        }
      };

      move();
    });
  };

  const { rotationX, rotationY, rotationZ, positionX, positionY, positionZ } =
    useControls("Model Transform", {
      positionX: { value: 0.0, min: -10, max: 10, step: 0.1 },
      positionY: { value: -1.1, min: -10, max: 10, step: 0.1 },
      positionZ: { value: 2.9, min: -10, max: 10, step: 0.1 },
      rotationX: { value: 0.2, min: 0, max: Math.PI * 2, step: 0.1 },
      rotationY: { value: 3.1, min: 0, max: Math.PI * 2, step: 0.1 },
      rotationZ: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
    });

  const mixerRef = useRef(new AnimationMixer(currentVrm.scene));
  const currentActionRef = useRef(null);

  const transitionSpeed = 0.1; // Smoothness of the position restoration

  // Define the restore position function
  const restorePosition = () => {
    const hips = currentVrm.humanoid?.getNormalizedBoneNode("hips");
    if (hips && initialHipsY.current !== null) {
      if (!isRestoringPosition) {
        setIsRestoringPosition(true);
        setRestoreStartTime(performance.now()); // Start restoring
      }

      const elapsedTime = (performance.now() - restoreStartTime) / 1000; // Time in seconds
      const targetY = initialHipsY.current;
      const currentY = hips.position.y;

      // Smoothly interpolate the Y position
      hips.position.y = MathUtils.lerp(
        currentY,
        targetY,
        Math.min(elapsedTime * transitionSpeed, 1)
      );

      // Stop restoring when close to the target position
      if (Math.abs(hips.position.y - targetY) < 1.5) {
        setIsRestoringPosition(false);
      }
    }
  };

  async function loadAndPlay(animationPath, speedAssign = 1.0) {
    console.log("animation path", animationPath);
    let clip;

    if (animationPath.endsWith(".fbx")) {
      clip = await loadMixamoAnimation(animationPath, currentVrm);
    } else if (animationPath.endsWith(".glb")) {
      clip = await loadMixamoAnimationGlb(animationPath, currentVrm);
    }

    const action = mixerRef.current.clipAction(clip);
    action.reset().fadeIn(0.5).play();
    action.loop = LoopOnce;
    action.clampWhenFinished = true;
    action.setEffectiveTimeScale(speedAssign);

    // Fade out previous action
    if (currentActionRef.current) {
      currentActionRef.current.fadeOut(0.5);
    }

    currentActionRef.current = action;

    return new Promise((resolve) => {
      const onFinished = (e) => {
        if (e.action === action) {
          mixerRef.current.removeEventListener("finished", onFinished);

          // Restore the position smoothly after animation finishes
          restorePosition();

          resolve();
        }
      };

      mixerRef.current.addEventListener("finished", onFinished);
    });
  }
  function expressionPlay(expressions) {
    console.log("in expression  play!!1", expressions);
    if (expressions && expressionManager) {
      for (const expr of expressions) {
        console.log("setting expr", expr);
        expressionManager.setValue(expr, 1);
      }
    }
  }

  async function expressionFade(expressions, delay = 10) {
    if (expressions && expressionManager) {
      for (const expr of expressions) {
        expressionManager.setValue(expr, 0);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  async function playSequenceThenMain() {
    setDisabled(true);
    console.log("Animation started, disabling buttons");

    for (const anim of animationSet.sequence) {
      setGreetingState(anim.text);
      expressionPlay(anim.expression);
      await loadAndPlay(anim.animation);
      await expressionFade(anim.expression);
    }
    setGreetingState(animationSet.mainAction.text);
    expressionPlay(animationSet.mainAction.expression);
    await loadAndPlay(animationSet.mainAction.animation, 1.0);
    setExpressionArr(animationSet.mainAction.expression);
    smoothMoveToLeft();
    setShow(true);
    setDisabled(false);
    console.log("Animation ended, enabling buttons");
  }

  async function playReplayThenMain() {
    setDisabled(true);
    if (expressionArr) {
      await expressionFade(expressionArr);
    }

    const feedbackExpressions = animationSet.feedback[feedbackType].expression;
    const randomIndex = Math.floor(Math.random() * feedbackExpressions.length);
    const chosenExpression = feedbackExpressions[randomIndex];
    console.log("chosen exo", chosenExpression);
    console.log("Animation started, disabling buttons");
    if (feedbackType === "correct" || feedbackType === "wrong") {
      setGreetingState(animationSet.feedback[feedbackType].text);
      expressionPlay([chosenExpression]);
      await loadAndPlay(animationSet.feedback[feedbackType].animation, 1.0);
    }
    await expressionFade([chosenExpression]);
    setGreetingState(animationSet.mainAction.text);
    expressionPlay(animationSet.mainAction.animation);
    await loadAndPlay(animationSet.mainAction.animation);

    setExpressionArr(animationSet.mainAction.expression);
    setFeedbackType(null);
    console.log("Animation ended, abling buttons");
    setDisabled(false);
  }
  async function playFeebackThenBye() {
    setDisabled(true);
    if (expressionArr) {
      await expressionFade(expressionArr);
    }
    console.log("Animation started, disabling buttons");
    const feedbackExpressions = animationSet.feedback[feedbackType].expression;
    const randomIndex = Math.floor(Math.random() * feedbackExpressions.length);
    const chosenExpression = feedbackExpressions[randomIndex];
    if (feedbackType === "correct" || feedbackType === "wrong") {
      setGreetingState(animationSet.feedback[feedbackType].text);
      expressionPlay(chosenExpression);
      await loadAndPlay(animationSet.feedback[feedbackType].animation, 1.0);
      setShow(false);
      await AsyncSmoothMoveToCenter();
    }
    await expressionFade(chosenExpression);
    setGreetingState(animationSet.bye.animation.text);
    expressionPlay(animationSet.bye.animation);
    await loadAndPlay(animationSet.bye.animation);

    setExpressionArr(animationSet.bye.expression);
    setFeedbackType(null);
    setDisabled(false);
    setShowEnd(true);
    console.log("Animation ended, abling buttons");
  }
  useEffect(() => {
    if (currentVrm && initialHipsY.current === null) {
      const hips = currentVrm.humanoid?.getNormalizedBoneNode("hips");
      if (hips) {
        initialHipsY.current = hips.position.y;
      }
    }
    playSequenceThenMain();
  }, [currentVrm]);

  useEffect(() => {
    const playAnimation = async () => {
      setDisabled(true); // Disable button or interaction while the animation plays
      if (replayTrigger) {
        console.log("Animation started, disabling buttons");
        await loadAndPlay(animationSet.mainAction.animation, speed);
      }

      console.log("Animation ended, abling buttons");
      setDisabled(false); // Enable button after animation completes
    };

    playAnimation(); // Call the async function
  }, [replayTrigger, speed]); // Dependency array to trigger useEffect when replayTrigger or speed changes

  useEffect(() => {
    console.log("game status", gameOver, gameWon);
    if (gameOver || gameWon) {
      console.log("bye bye");
      playFeebackThenBye();
    } else if (feedbackType) {
      console.log("no bye bye");
      playReplayThenMain();
    }
  }, [feedbackType, gameOver, gameWon]);
  useEffect(() => {
    if (!expressionManager) return;

    let isMounted = true;
    let animationFrame;

    const fadeValue = (expression, from, to, duration) => {
      const start = performance.now();

      const animate = (now) => {
        if (!isMounted) return;

        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = from + (to - from) * progress;

        expressionManager.setValue(expression, value);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    const blink = () => {
      if (!isMounted) return;

      fadeValue("blink", 0, 1, 100); // Fade in over 100ms

      setTimeout(() => {
        if (!isMounted) return;
        fadeValue("blink", 1, 0, 150); // Fade out over 150ms
      }, 100);
    };

    const startBlinking = () => {
      const randomDelay = 2000 + Math.random() * 3000;
      return setTimeout(() => {
        blink();
        startBlinking();
      }, randomDelay);
    };

    const blinkTimer = startBlinking();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrame);
      clearTimeout(blinkTimer);
    };
  }, [expressionManager]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
    currentVrm?.update(delta);

    // Continuously restore position if needed
    if (isRestoringPosition) {
      restorePosition();
    }
  });

  return (
    <primitive
      ref={vrmRef}
      object={currentVrm.scene}
      position={[positionXz, positionY, positionZ]}
      rotation={[rotationX, rotationYz, rotationZ]}
      {...props}
    />
  );
}

export default function Scene({ onComplete, json, points }) {
  const [animationSet, setAnimationSet] = useState(null);
  const [currentVrm, setCurrentVrm] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isAnim, setIsAnim] = useState(false);
  const [replayTrigger, setReplayTrigger] = useState(0);
  const [feedbackType, setFeedbackType] = useState(null);
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const maxPoints = 100;
  const [lives, setLives] = useState(4);
  const [score, setScore] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [greetingState, setGreetingState] = useState("");
  const handleAnswer = (type) => {
    if (isAnim) return;
    setFeedbackType(type);
    if (type === "correct") {
      setCorrectStreak((prev) => {
        const updated = prev + 1;
        if (updated >= 3) {
          console.log("won this");
          setGameWon(true);
          // setShow(false);
        }
        return updated;
      });
      const pointsPerCorrect = distributePoints(points, 3);
      console.log("points per corr", pointsPerCorrect, "tru", points);
      setScore((prevScore) => prevScore + pointsPerCorrect[correctStreak]);
    } else if (type === "wrong") {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
          setShow(false);
        }
        return newLives;
      });
    }
  };
  console.log("IN COMP", json);
  useEffect(() => {
    console.log("received", json);
    setAnimationSet(json);
  }, [json]);
  useEffect(() => {
    if ((gameOver || gameWon) && showEnd) {
      onComplete(score);
    }
  }, [gameOver, gameWon, showEnd]);
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    const loadModel = async () => {
      try {
        loader.load(
          "/both_sleeve_Edit.vrm",
          (gltf) => {
            const vrm = gltf.userData.vrm;
            VRMUtils.removeUnnecessaryVertices(gltf.scene);
            VRMUtils.combineSkeletons(gltf.scene);
            VRMUtils.combineMorphs(vrm);
            vrm.scene.traverse((obj) => {
              obj.frustumCulled = false;
            });
            VRMUtils.rotateVRM0(vrm);
            setCurrentVrm(vrm);
          },
          (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setLoadingProgress(percent);
          },
          (error) => {
            setError(error.message);
            console.error("Error loading VRM:", error);
          }
        );
      } catch (err) {
        setError(err.message);
      }
    };

    loadModel();

    return () => {
      if (currentVrm) {
        currentVrm.dispose();
      }
    };
  }, []);

  const camControlsRef = useRef();
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  const handleZoomToggle = () => {
    if (!camControlsRef.current) return;

    if (isZoomedIn) {
      camControlsRef.current.zoom(-1, true);
    } else {
      camControlsRef.current.zoom(1, true);
    }
    setIsZoomedIn((prev) => !prev);
  };
  const { position, rotation, intensity } = useControls("Directional Light", {
    position: {
      value: [1, 1, 1],
      step: 0.1,
      label: "Position",
    },
    rotation: {
      value: [0, 0, 0],
      step: 0.1,
      label: "Rotation",
    },
    intensity: {
      value: 1.8,
      min: 0,
      max: 10,
      step: 0.1,
    },
  });

  return (
    <div className="w-screen h-screen  relative flex">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover "
      >
        <source
          src="/videos/Circle-Cross-Triangle_Yellow-1.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex w-full px-6 justify-center">
        {/* Progress Bar Container (centered) */}
        <div className="w-full max-w-3xl flex-1 space-y-2">
          {/* Bar Container */}
          <div className="w-full h-8 bg-fuchsia-100 border-4 border-black rounded-full shadow-[3px_3px_0_rgba(0,0,0,1)] overflow-hidden">
            {/* Animated Bar Fill */}
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(correctStreak / 3) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Label */}
          <div className="text-center text-xl font-extrabold text-pink-600 drop-shadow-[1px_1px_0_black]">
            {correctStreak} / 3 Correct
          </div>
        </div>
      </div>

      {/* Lives and Score Container (left-aligned) */}
      <div className="absolute top-4 left-0 z-30 flex items-center space-x-8 px-2 py-2 bg-fuchsia-100 border-4 border-black rounded-xl shadow-[4px_4px_0_rgba(0,0,0,1)]">
        {/* Lives Display */}
        <div className="flex space-x-2 items-center">
          {Array.from({ length: lives }).map((_, i) => (
            <span
              key={i}
              className="text-xl text-red-500 drop-shadow-[1px_1px_0_black]"
            >
              ❤️
            </span>
          ))}
          {Array.from({ length: 4 - lives }).map((_, i) => (
            <span
              key={i + lives}
              className="text-xl text-gray-400 drop-shadow-[1px_1px_0_black]"
            >
              💀
            </span>
          ))}
        </div>

        {/* Score Display */}
        <div className="text-2xl font-extrabold text-pink-600 border-l-4 border-black pl-6 ml-4">
          Score: <span className="text-black">{score}</span>
        </div>
      </div>

      {greetingState && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-full px-8 ">
          <div className="relative bg-white border-4 border-black rounded-xl shadow-xl px-10 py-8 max-w-5xl mx-auto text-left ">
            <p className="text-5xl font-bold text-gray-800">
              {greetingState}...
            </p>
            {/* Triangle pointer */}
            <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[24px] border-l-transparent border-r-transparent border-t-black" />
          </div>
        </div>
      )}

      {show && (
        <>
          <div className="absolute top-1/2 left-[25px] transform -translate-y-1/2 space-y-6 flex z-20 flex-col items-center">
            <button
              className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl border-4 transition-all
      ${
        isAnim
          ? "bg-gray-300 text-gray-400 border-gray-500 cursor-not-allowed"
          : "bg-fuchsia-300 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110"
      }`}
              onClick={() => setReplayTrigger((prev) => prev + 1)}
              disabled={isAnim}
            >
              ↻
            </button>

            <select
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className={`w-20 h-20 rounded-full text-center text-xl font-semibold border-4 appearance-none transition-all
      ${
        isAnim
          ? "bg-gray-300 text-gray-400 border-gray-500 cursor-not-allowed"
          : "bg-fuchsia-200 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110"
      }`}
              disabled={isAnim}
            >
              <option value={1.0}>1x</option>
              <option value={0.5}>0.5x</option>
              <option value={0.25}>0.25x</option>
            </select>

            <button
              onClick={handleZoomToggle}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-semibold border-4 transition-all
      bg-fuchsia-200 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110`}
            >
              🔍
            </button>
          </div>

          <motion.div
            className="z-20 fixed top-1/2 right-[25px] transform translate-y-[-50%] bg-fuchsia-100 border-4 border-black rounded-2xl shadow-[6px_6px_0_rgba(0,0,0,1)] h-[60%] w-[40%] p-4"
            animate={
              feedbackType === "wrong"
                ? {
                    x: [-20, 20, -20, 20, -15, 15, -10, 10, 0],
                    transition: { duration: 0.7, ease: "easeInOut" },
                  }
                : {}
            }
          >
            <ImageInput
              isAnim={isAnim}
              handleAnswer={handleAnswer}
              feedbackType={feedbackType}
              answer={animationSet.answer}
              model={animationSet.model}
            />
          </motion.div>
        </>
      )}

      <Canvas gl={{ toneMapping: NoToneMapping }} linear camera={{ fov: 30 }}>
        <ambientLight intensity={1.4} />
        <directionalLight
          position={[1, 1, 1]}
          rotation={[0, 0, 0]}
          intensity={intensity}
        />

        <CameraControls ref={camControlsRef} />
        {currentVrm && animationSet && (
          <Model
            currentVrm={currentVrm}
            replayTrigger={replayTrigger}
            feedbackType={feedbackType}
            setDisabled={setIsAnim}
            setShow={setShow}
            setFeedbackType={setFeedbackType}
            speed={speed}
            setShowEnd={setShowEnd}
            gameOver={gameOver}
            gameWon={gameWon}
            setGreetingState={setGreetingState}
            animationSet={animationSet}
          />
        )}
      </Canvas>

      {!currentVrm && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-pink-500">
          <div className="text-center">
            <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-fuchsia-500 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="mt-2">
              Loading model... {Math.round(loadingProgress)}%
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-pink-500">
          <div className="bg-red-500 p-4 rounded-lg max-w-md text-center">
            <h2 className="text-xl font-bold mb-2">Error Loading Model</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white text-red-500 rounded hover:bg-gray-100"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* {showEnd && gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-red-500 mb-4">Game Over!</h2>
            <p className="text-lg mb-4">You ran out of hearts 💔</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {showEnd && gameWon && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-green-500 mb-4">
              You Win! 🎉
            </h2>
            <p className="text-lg mb-4">Score: {score}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Play Again
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}
