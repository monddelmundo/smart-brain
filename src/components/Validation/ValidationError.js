import React, { useState } from "react";
import "./ValidationError.css";

const ValidationError = ({ errorMessage }) => {
  //const [hasError, setHasError] = useState(false);

  return errorMessage ? (
    <div className="tc fw9 bg-dwyl-teal br2 red">{errorMessage}</div>
  ) : null;
};

export default ValidationError;
