import { useState } from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const his = useHistory();
  const [show, setShow] = useState(true);

  return (
    <div
      style={{ height: 300 }}
      className="d-flex flex-column justify-content-center align-items-center rounded shadow-lg"
    >
      <p className="h4 fw-bold">Page Not Found!</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          his.push("/template/my-task/react/");
          setShow(false);
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
