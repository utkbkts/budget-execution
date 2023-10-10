import { useState} from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Spinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#36d7b7");

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;