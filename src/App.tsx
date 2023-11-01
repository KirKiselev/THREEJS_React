import { useEffect, useRef } from "react";
import "./App.css";
import { ThreeAnimation } from "./ThreeAnimation";

function App() {
  const refContainer = useRef(null);
  const refAnimation = useRef<ThreeAnimation | null>(null);

  useEffect(() => {
    refAnimation.current = new ThreeAnimation(refContainer);
  }, []);

  return <div ref={refContainer} id="threeContainer"></div>;
}

export default App;
