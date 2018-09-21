import React from "react";
import ReactDOM from "react-dom";

import "./portal.css";

export default ({ children, callback }) => {
  const Portal = (
    <div className="Modal-container" onClick={callback}>
      <div className="Modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={callback}> Close</button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(Portal, document.body);
};
