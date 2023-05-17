import React from "react";

const MainArea = (props) => {
  return (
    <div className="main-area" style={{fontSize: props.size, color: props.color}}>
      <p>Szkielety programistyczne w aplikacjach internetowych: Node, MongoDB, Express, React.</p>
    </div>
  );
};

export default MainArea;

/*
<div className="main-area" style={{fontSize: size, color: color}}>
<p>Szkielety programistyczne w aplikacjach internetowych: Node, MongoDB, Express, React.</p>
</div>
*/