import { Client } from "@gradio/client";

/**
 * Sends an image to the Gradio Space and returns the top prediction label.
 *
 * @param {"alphabet" | "digit"} modelType - Choose which model to use
 * @param {Blob | File} imageBlob - The image file to send
 * @returns {Promise<string>} - The top prediction label
 */
export async function predictSign(modelType, imageBlob) {
  try {
    const client = await Client.connect("Sherryzzz/Sign-Language"); // e.g., "Sherryzzz/Sign-Language"

    const apiRoute = modelType === "alphabets" ? "/predict" : "/predict_1";
    console.log("modeltype", apiRoute, modelType);
    const result = await client.predict(apiRoute, {
      image: imageBlob,
    });
    // result.data is an object like { A: 0.95, B: 0.03, ... }
    const predictions = result.data;
    const topLabel = predictions[0].label;
    console.log("results of model", topLabel);

    return topLabel;
  } catch (error) {
    console.error("Prediction failed:", error);
    throw error;
  }
}
