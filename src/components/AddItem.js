import ItemForm from "./ItemForm";
import { useState } from "react";

function AddItem({ listName }) {
  const [clicked, setClicked] = useState(false);

  function toggleClicked() {
    setClicked(!clicked);
  }

  return (
    <div className="AddItem">
      <div className="Add-div">
        {clicked && (
          <ItemForm listName={listName} toggleClicked={toggleClicked} />
        )}

        <button onClick={toggleClicked}>
          <p id="add-btn-short">+</p>
          <p id="add-btn-long-text">New Item</p>
        </button>
      </div>
    </div>
  );
}

export default AddItem;
