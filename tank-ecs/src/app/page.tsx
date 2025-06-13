"use client";

import { Suspense, use, useEffect, useRef } from "react";

import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { SceneLoaderFlags } from "@babylonjs/core/Loading/sceneLoaderFlags";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";

import HavokPhysics from "@babylonjs/havok";

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/core/Loading/Plugins/babylonFileLoader";

import "@babylonjs/core/Cameras/universalCamera";

import "@babylonjs/core/Meshes/groundMesh";

import "@babylonjs/core/Lights/directionalLight";
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent";

import "@babylonjs/core/Materials/PBR/pbrMaterial";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/XR/features/WebXRDepthSensing";

import "@babylonjs/core/Rendering/depthRendererSceneComponent";
import "@babylonjs/core/Rendering/prePassRendererSceneComponent";

import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";

import "@babylonjs/core/Physics";

import "@babylonjs/materials/sky";

import { loadScene } from "babylonjs-editor-tools";

/**
 * We import the map of all scripts attached to objects in the editor.
 * This will allow the loader from `babylonjs-editor-tools` to attach the scripts to the
 * loaded objects (scene, meshes, transform nodes, lights, cameras, etc.).
 */
import { scriptsMap } from "@/scripts";
import { WebGPUEngine } from "@babylonjs/core/Engines/webgpuEngine";

export default function Home() {
    return (
        <main className="flex w-screen h-screen flex-col items-center justify-between">
            <Suspense fallback={<div>Loading...</div>}>
                <HomeComponent />
            </Suspense>
        </main>
    )
}

function startEngine(canvas: HTMLCanvasElement) {
    return new Promise<Engine | WebGPUEngine>(async resolve => {
        const webGPUSupported = await WebGPUEngine.IsSupportedAsync;
        if (webGPUSupported) {
            const engine = new WebGPUEngine(canvas);
            await engine.initAsync();
            return resolve(engine);
        }

        const engine = new Engine(canvas, true, {
            stencil: true,
            antialias: true,
            audioEngine: true,
            adaptToDeviceRatio: true,
            disableWebGL2Support: false,
            useHighPrecisionFloats: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
        });

        resolve(engine);
    })
}

function HomeComponent() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        let scene: Scene;
        let engine: Engine | WebGPUEngine;


        handleLoad().then((res) => {
            scene = res.scene;
            engine = res.engine;
        })

        let listener: () => void;
        window.addEventListener("resize", listener = () => {
            engine.resize();
        });

        return () => {
            scene?.dispose();
            engine?.dispose();

            window.removeEventListener("resize", listener);
        };
    }, [canvasRef]);

    async function handleLoad() {
        const canvas = canvasRef.current!;
        const engine = await startEngine(canvas);

        const scene = new Scene(engine);
        const havok = await HavokPhysics();

        scene.enablePhysics(new Vector3(0, -981, 0), new HavokPlugin(true, havok));

        SceneLoaderFlags.ForceFullSceneLoadingForIncremental = true;
        await loadScene("/scene/", "example.babylon", scene, scriptsMap, {
            quality: "high",
        });

        if (scene.activeCamera) {
            scene.activeCamera.attachControl();
        }

        engine.runRenderLoop(() => {
            scene.render();
        });

        return {scene, engine};
    }

    return (
        <main className="flex w-screen h-screen flex-col items-center justify-between">
            <canvas
                ref={canvasRef}
                className="w-full h-full outline-none select-none"
            />
        </main>
    );
}
