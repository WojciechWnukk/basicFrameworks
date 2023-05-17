import React from "react";

const Header = (props) => {
  return (
<div className="header">
<h1>Nagłówek</h1>
<p>Aktualny rozmiar czcionki: <strong>{props.size}</strong></p>
<p>Aktualny kolor czcionki: <strong>{props.color}</strong></p>
<p>
Liczba lajków: <strong>{props.like}</strong>
</p>
</div>
  );
};

export default Header;

/*
<div className="header">
<h1>Nagłówek</h1>
<p>Aktualny rozmiar czcionki: <strong>{size}</strong></p>
<p>Aktualny kolor czcionki: <strong>{color}</strong></p>
<p>
Liczba lajków: <strong>{like}</strong>
</p>
</div>
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