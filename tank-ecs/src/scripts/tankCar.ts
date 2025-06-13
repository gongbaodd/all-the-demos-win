import { Mesh } from "@babylonjs/core/Meshes/mesh";

export function onStart(mesh: Mesh): void {
    console.log(mesh)
    // Do something when the script is loaded
}

export function onUpdate(mesh: Mesh): void {
    // console.log(mesh.getScene().getAnimationRatio())
    mesh.rotation.y += 0.04 * mesh.getScene().getAnimationRatio();
}
