import React from "react";

const Footer = (props) => {
  return (
<footer className="footer">
<p>
Stopka <button onClick={() => {
    props.setSize("30px")
    props.setSizeInput("30px")
}}>Ustaw parametry tekstu na 30px, a kolor pozostaw bez zmian.</button>
</p>
<p>
<button onClick={() => {
    props.setLike(props.like+1);
}}>Polub tę stronę!</button>
</p>
</footer>
  );
};

export default Footer;
