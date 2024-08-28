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
          New Item
        </button>
      </div>
    </div>
  );
}

export default AddItem;
