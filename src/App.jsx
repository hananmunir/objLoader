import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "./Loot.jsx";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { useEffect, useState } from "react";

function App() {
  const [model, setModel] = useState();

  useEffect(() => {
    const loader = new OBJLoader();
    loader.load("/loot.obj", setModel);
  }, []);
  return (
    <>
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          margin: 0,
          padding: 0,
          background: "#808080",
        }}
      >
        <Suspense fallback={<>Loading..</>}>
          {/* <OrbitControls /> */}
          <hemisphereLight intensity={0.15} groundColor='black' />

          <pointLight intensity={1} />
          <ambientLight intensity={0.1} />

          {/* this part is loading the meshes of model in JSX  */}
          <Model position={[0, -1, 0]} />

          {/* this part is loading the meshes of model in OBJ format  */}

          {/* {model && <primitive object={model} />} */}
        </Suspense>

        <Preload all />
      </Canvas>
    </>
  );
}

export default App;
