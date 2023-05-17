import './App.css';
import React, { useState } from "react"
import tinycolor from "tinycolor2";
import Footer from "./components/Footer";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainArea from './components/MainArea';
function App() {
    const [size, setSize] = useState("18px");
    const [color, setColor] = useState("green");
    const [like, setLike] = useState(0);
    const [sizeInput, setSizeInput] = useState(size);
    const [colorInput, setColorInput] = useState(color);

    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        setSizeInput(newSize);
        if (/^\d+(?:px)?$/.test(newSize)) {
          setSize(newSize);
        } else{
            console.error("Podano niepoprawną wartość rozmiaru ", newSize);
        }
      };

      const handleColorChange = (event) => {
        const newColor = event.target.value;
        setColorInput(newColor);
        if (/^[a-zA-Z]+$/.test(newColor) && tinycolor(newColor).isValid()) {
          setColor(newColor);
        } else {
          console.error("Podano nieprawidłową wartość koloru ", newColor);
        }
      };
return (
<div className="grid-parent">
<Header
        size={size}
        sizeInput={sizeInput}
        like={like}
        setLike={setLike}
        setSize={setSize}
        setSizeInput={setSizeInput}
/>
<Sidebar
  size={size}
  sizeInput={sizeInput}
  colorInput={colorInput}
  handleSizeChange={handleSizeChange}
  color={color}
  handleColorChange={handleColorChange}
  setColor={setColor}
  setColorInput={setColorInput}
  setSize={setSize}
  setSizeInput={setSizeInput}
/>
<MainArea
      size={size}
      sizeInput={sizeInput}
      colorInput={colorInput}
      handleSizeChange={handleSizeChange}
      color={color}
      handleColorChange={handleColorChange}
      setColor={setColor}
      setColorInput={setColorInput}
      setSize={setSize}
      setSizeInput={setSizeInput}
/>
<Footer
        size={size}
        sizeInput={sizeInput}
        like={like}
        setLike={setLike}
        setSize={setSize}
        setSizeInput={setSizeInput}
      />
</div>
)
}
export default App