import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddItem } from "../app/usersSlice";

function ItemForm({ listName, toggleClicked }) {
  const [obj, setObj] = useState({
    itemName: "",
    quantity: "",
    category: "",
    notes: "",
    itemPic: "",
    share: false,
    edit: false,
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    //check if item exists in the users items array
    let userCopy = { ...user };
    //get list
    const [filteredList] = userCopy.lists.filter(
      (list) => list.listName === listName
    );
    const filteredItem = filteredList.items.filter(
      (item) => item.itemName === obj.itemName
    );

    //if item is not found, add the item to the users items
    if (filteredItem.length === 0) {
      if (obj.itemName === "") {
        alert("Please enter an item name.");
      } else {
        let newitems = [...filteredList.items, obj];

        //dispatch the new item to the fetchAdditem function
        dispatch(
          fetchAddItem({ listName: filteredList.listName, items: newitems })
        );

        //alert success
        alert("Item has been succesfully added.");
      }
    }
    toggleClicked();
  }

  function handleFormClose() {
    toggleClicked();
  }
  function handleImageUpload(e) {
    let input = document.getElementById("item-pic");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setObj({
        ...obj,
        itemPic: event.target.result,
      });
    };
  }

  return (
    <div className="Form">
      <div className="form-div">
        <div className="form-title-close">
          <h3>Enter Item Information</h3>
          <div className="form-close" onClick={handleFormClose}>
            x
          </div>
        </div>
        <form>
          <div className="name">
            <label htmlFor="item-name">
              Item Name
              <input
                type="text"
                id="item-name"
                name="itemName"
                onChange={(e) => handleChange(e)}
                value={obj.itemName}
                required
              />
            </label>
          </div>

          <div className="quantity">
            <label htmlFor="quantity">
              Quantity
              <input
                type="text"
                id="quantity"
                name="quantity"
                onChange={(e) => handleChange(e)}
                value={obj.quantity}
              />
            </label>
          </div>

          <div className="category">
            <label htmlFor="category">
              Category
              <input
                id="category"
                name="category"
                onChange={(e) => handleChange(e)}
                value={obj.category}
              />
            </label>
          </div>

          <div className="notes">
            <label htmlFor="notes">
              Notes
              <input
                type="text"
                id="notes"
                name="notes"
                onChange={(e) => handleChange(e)}
                value={obj.notes}
              />
            </label>
          </div>
          <div className="item-pic">
            <label htmlFor="item-pic">
              Item picture:
              <input
                type="file"
                id="item-pic"
                name="pic"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>
          </div>

          <input
            id="task-add-submit"
            type="submit"
            value="submit"
            onClick={handleSubmit}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default ItemForm;
