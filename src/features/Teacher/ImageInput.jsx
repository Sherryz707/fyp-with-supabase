// import { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { predictSign } from "../../services/modelService";
// export default function ImageInput({
//   answer,
//   handleAnswer,
//   isAnim,
//   feedbackType,
//   model,
// }) {
//   const webcamRef = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   // Convert dataURL to Blob
//   const dataURLtoBlob = (dataUrl) => {
//     const byteString = atob(dataUrl.split(",")[1]);
//     const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++)
//       ia[i] = byteString.charCodeAt(i);
//     return new Blob([ab], { type: mimeString });
//   };

//   // Process image blob, run prediction, set feedback
//   const handleImage = async (imageBlob) => {
//     if (isAnim) return;
//     setLoading(true);
//     handleAnswer(null);

//     try {
//       // Use "alphabet" or "digit" depending on your quiz
//       const topLabel = await predictSign(model, imageBlob); // or "digit"

//       if (topLabel.toLowerCase() === answer.toLowerCase()) {
//         handleAnswer("correct");
//       } else {
//         handleAnswer("wrong");
//       }
//     } catch (error) {
//       console.error("Prediction error:", error);
//       handleAnswer(null);
//     } finally {
//       setPreviewImage(null);
//       setLoading(false);
//     }
//   };

//   // Capture image from webcam
//   const capture = () => {
//     if (webcamRef.current) {
//       const dataUrl = webcamRef.current.getScreenshot();
//       if (!dataUrl) return;
//       const blob = dataURLtoBlob(dataUrl);
//       setPreviewImage(dataUrl);
//       handleImage(blob);
//     }
//   };

//   // Handle file upload
//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const objectUrl = URL.createObjectURL(file);
//       setPreviewImage(objectUrl);
//       handleImage(file);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center  h-full gap-6">
//       {/* Webcam + Feedback Overlay */}
//       <div className="relative w-full h-full bg-white border-4 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,1)]">
//         {previewImage ? (
//           <img
//             src={previewImage}
//             alt="Uploaded or captured"
//             className="w-full h-full rounded-xl object-cover"
//           />
//         ) : (
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             className="w-full h-full rounded-xl object-cover"
//           />
//         )}

//         {feedbackType && (
//           <div
//             className={`absolute inset-0 flex items-center justify-center text-4xl font-extrabold border-4 rounded-xl
//             ${
//               feedbackType === "correct"
//                 ? "bg-green-400 bg-opacity-60 text-pink-600 border-pink-600"
//                 : feedbackType === "wrong"
//                   ? "bg-red-400 bg-opacity-60 text-white border-red-600"
//                   : "bg-yellow-400 bg-opacity-60 text-black border-yellow-600"
//             }`}
//           >
//             {feedbackType}
//           </div>
//         )}

//         {!feedbackType && !loading && (
//           <p className="text-gray-700 font-semibold absolute z-10 select-none pointer-events-none">
//             [ Webcam Screen ]
//           </p>
//         )}

//         {loading && (
//           <p className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-yellow-600 bg-white bg-opacity-80 rounded-xl select-none pointer-events-none animate-pulse">
//             ⏳ Processing...
//           </p>
//         )}
//       </div>

//       {/* Capture & Upload Controls */}
//       <div className="flex flex-col sm:flex-row gap-6 items-center">
//         <button
//           onClick={capture}
//           disabled={loading || isAnim}
//           className={`px-6 py-3 rounded-xl text-2xl font-bold border-4 transition-all
//           ${
//             loading || isAnim
//               ? "bg-gray-300 text-gray-400 border-gray-500 cursor-not-allowed"
//               : "bg-blue-300 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110"
//           }`}
//         >
//           📸 Capture
//         </button>

//         <label
//           htmlFor="file-upload"
//           className={`px-6 py-3 rounded-xl text-2xl font-bold border-4 cursor-pointer transition-all
//           ${
//             loading || isAnim
//               ? "bg-gray-300 text-gray-400 border-gray-500 cursor-not-allowed"
//               : "bg-purple-300 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110"
//           }`}
//         >
//           📁 Upload Image
//         </label>
//         <input
//           id="file-upload"
//           type="file"
//           accept="image/*"
//           disabled={loading || isAnim}
//           onChange={handleUpload}
//           className="hidden"
//         />
//       </div>
//     </div>
//   );
// }
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { predictSign } from "../../services/modelService";

export default function ImageInput({
  answer,
  handleAnswer,
  isAnim,
  feedbackType,
  model,
}) {
  const webcamRef = useRef(null);
  const correctAudioRef = useRef(null);
  const wrongAudioRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Play sound when feedbackType changes
  useEffect(() => {
    if (feedbackType === "correct") {
      correctAudioRef.current?.play().catch(() => {});
    } else if (feedbackType === "wrong") {
      wrongAudioRef.current?.play().catch(() => {});
    }
  }, [feedbackType]);

  // ... rest of your code unchanged

  // Convert dataURL to Blob
  const dataURLtoBlob = (dataUrl) => {
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);
    return new Blob([ab], { type: mimeString });
  };

  // Process image blob, run prediction, set feedback
  const handleImage = async (imageBlob) => {
    if (isAnim) return;
    setLoading(true);
    handleAnswer(null);

    try {
      const topLabel = await predictSign(model, imageBlob);
      if (topLabel.toLowerCase() === answer.toLowerCase()) {
        handleAnswer("correct");
      } else {
        handleAnswer("wrong");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      handleAnswer(null);
    } finally {
      setPreviewImage(null);
      setLoading(false);
    }
  };

  // Capture image from webcam
  const capture = () => {
    if (webcamRef.current) {
      const dataUrl = webcamRef.current.getScreenshot();
      if (!dataUrl) return;
      const blob = dataURLtoBlob(dataUrl);
      setPreviewImage(dataUrl);
      handleImage(blob);
    }
  };

  // Handle file upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      handleImage(file);
    }
  };

  return (
    <>
      {/* Audio elements for correct and wrong feedback */}
      <audio ref={correctAudioRef} src="/sounds/correct.mp3" preload="auto" />
      <audio ref={wrongAudioRef} src="/sounds/wrong.mp3" preload="auto" />

      <div className="flex flex-col items-center  h-full gap-6">
        {/* Webcam + Feedback Overlay */}
        <div className="relative w-full h-full bg-white border-4 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,1)]">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Uploaded or captured"
              className="w-full h-full rounded-xl object-cover"
            />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full rounded-xl object-cover"
            />
          )}

          {feedbackType && (
            <div
              className={`absolute inset-0 flex items-center justify-center text-4xl font-extrabold border-4 rounded-xl 
              ${
                feedbackType === "correct"
                  ? "bg-green-400 bg-opacity-60 text-pink-600 border-pink-600"
                  : feedbackType === "wrong"
                    ? "bg-red-400 bg-opacity-60 text-white border-red-600"
                    : "bg-yellow-400 bg-opacity-60 text-black border-yellow-600"
              }`}
            >
              {feedbackType}
            </div>
          )}

          {!feedbackType && !loading && (
            <p className="text-gray-700 font-semibold absolute z-10 select-none pointer-events-none">
              [ Webcam Screen ]
            </p>
          )}

          {loading && (
            <p className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-yellow-600 bg-white bg-opacity-80 rounded-xl select-none pointer-events-none animate-pulse">
              ⏳ Processing...
            </p>
          )}
        </div>

        {/* Capture & Upload Controls */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <button
            onClick={capture}
            disabled={loading || isAnim}
            className={`px-6 py-3 rounded-xl text-2xl font-bold border-4 transition-all
            ${
              loading || isAnim
                ? "bg-gray-300 text-gray-400 border-gray-500 cursor-not-allowed"
                : "bg-blue-300 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110"
            }`}
          >
            📸 Capture
          </button>

          <label
            htmlFor="file-upload"
            className={`px-6 py-3 rounded-xl text-2xl font-bold border-4 cursor-pointer transition-all
            ${
              loading || isAnim
                ? "bg-gray-300 text-gray-400 border-gray-500 cursor-not-allowed"
                : "bg-purple-300 text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:brightness-110"
            }`}
          >
            📁 Upload Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            disabled={loading || isAnim}
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </div>
    </>
  );
}
