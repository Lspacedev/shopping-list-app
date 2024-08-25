import Form from "./Form";
import { useState } from "react";

function AddList() {
  const [clicked, setClicked] = useState(false);

  function toggleClicked() {
    setClicked(!clicked);
  }

  return (
    <div className="AddList">
      <div className="Add-div">
        {clicked && (
          <Form
            toggleClicked={toggleClicked}
          />
        )}

        <button onClick={toggleClicked}>
          <p id="add-btn-short">+</p>
          <p id="add-btn-long-text">New List</p>
        </button>
      </div>
    </div>
  );
}

export default AddList;
