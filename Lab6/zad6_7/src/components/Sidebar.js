import React from "react";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <input type="text" value={props.sizeInput} onChange={props.handleSizeChange} />
      <input type="text" value={props.colorInput} onChange={props.handleColorChange} />
      <button onClick={() => {
        props.setColor("pink");
        props.setColorInput("pink");
        props.setSize("20px");
        props.setSizeInput("20px");
      }}>Ustaw parametry tekstu na 20px i pink.</button>
    </div>
  );
};

export default Sidebar;


/*

<div className="sidebar">
<input type="text" value={sizeInput} onChange={handleSizeChange} />
<input type="text" value={colorInput} onChange={handleColorChange} />
<button onClick={() => {
    setColor("pink");
    setColorInput("pink")
    setSize("20px");
    setSizeInput("20px")
    
    
}}>Ustaw parametry tekstu na 20px i pink.</button>
</div>
*/