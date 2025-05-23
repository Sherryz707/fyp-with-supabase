import { loadMixamoAnimation, loadMixamoAnimationGlb } from "./loadMixamoAnim";

export async function loadFBX(animationUrl, scale = 1.0, loop = true) {
  let clip;
  if (animationUrl.endsWith(".fbx")) {
    // Load FBX animation
    clip = await loadMixamoAnimation(animationUrl, currentVrm);
  } else if (animationUrl.endsWith(".glb")) {
    // Load GLB animation
    clip = await loadMixamoAnimationGlb(animationUrl, currentVrm);
  }
  // Stop all other actions
  // currentMixer.current.stopAllAction();

  const action = currentMixer.current.clipAction(clip);
  action.timeScale = scale;
  action.setEffectiveWeight(1);

  // Reset the animation to start cleanly
  action.reset();

  // Set fade-in to ensure smooth start
  action.fadeIn(0.5).play();

  // Clamp the action when finished
  action.clampWhenFinished = true;

  // Ensure the action only plays once
  action.loop = LoopOnce;

  return action; // Return the action
}
