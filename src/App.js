import { useEffect, useRef, useState } from "react";
import "./App.css";
import Draggable from "react-draggable";

function App() {
  const [bounds, setBounds] = useState({});
  const dragRef = useRef(null);

  useEffect(() => {
    if (dragRef.current) {
      const width = dragRef.current.clientWidth;
      const height = dragRef.current.clientHeight;

      setBounds({
        left: 0,
        top: 0,
        right: window.innerWidth - width,
        bottom: window.innerHeight - height,
      });
    }

    // Adjust the bounds when the window is resized
    const handleResize = () => {
      if (dragRef.current) {
        const width = dragRef.current.clientWidth;
        const height = dragRef.current.clientHeight;

        setBounds({
          left: 0,
          top: 0,
          right: window.innerWidth - width,
          bottom: window.innerHeight - height,
        });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Draggable bounds={bounds}>
      <div className="box" ref={dragRef}>
        <strong className="no-cursor">Drag here</strong>
        <div>Dragging works inside the viewport</div>
      </div>
    </Draggable>
  );
}

export default App;
