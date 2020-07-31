import React from "react";

import "./styles/PageError.css";

function PageError(props) {
  return (
    <div className="PageError">
      <span role="img"></span> ❌{props.error.message}😤
    </div>
  );
}

export default PageError;
