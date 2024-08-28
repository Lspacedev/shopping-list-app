import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateItem, fetchDeleteItem } from "../app/usersSlice";
import { toggleItemEdit } from "../app/usersSlice";

function Item({ item, listName, itemName, index }) {
  const user = useSelector((state) => state.users.currentUser);

  const [obj, setObj] = useState({
    itemName: "",
    quantity: "",
    category: "",
    notes: "",
    items: [],
    edit: false,
  });

  // create handleDelete function for itemCard
  const dispatch = useDispatch();

  function handleDeleteItem(name) {
    let userCopy = { ...user };
    //get list
    const [filteredList] = userCopy.lists.filter(
      (list) => list.listName === listName
    );
    const filteredItems = filteredList.items.filter(
      (item) => item.itemName !== name
    );

    dispatch(
      fetchDeleteItem({ listName: filteredList.listName, items: filteredItems })
    );
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleUpdateItemEdit(list, item) {
    console.log({ list, item });
    dispatch(toggleItemEdit({ listName: list, itemName: item }));
  }

  function handleUpdateitem(name, itemN, obj) {
    let newItemObj = {
      itemName: "",
      quantity: "",
      category: "",
      notes: "",
      itemPic: "",

      edit: false,
    };
    let userCopy = { ...user };
    //get list
    const [filteredList] = userCopy.lists.filter(
      (list) => list.listName === listName
    );
    const [item] = filteredList.items.filter((item) => item.itemName === itemN);

    //*****refactor to switch statement*****

    newItemObj.itemName = obj.itemName === "" ? item.itemName : obj.itemName;
    newItemObj.quantity = obj.quantity === "" ? item.quantity : obj.quantity;
    newItemObj.category = obj.category === "" ? item.category : obj.category;
    newItemObj.notes = obj.notes === "" ? item.notes : obj.notes;
    newItemObj.itemPic = obj.itemPic === "" ? item.itemPic : obj.itemPic;

    // items.edit = true;

    ////dispatch the new item to the fetchAdditem function
    dispatch(
      fetchUpdateItem({ listName: name, itemName: itemN, item: newItemObj })
    );
  }
  function handleImageUpload(e) {
    let input = document.getElementById("item-pic2");
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
    <div className="Item">
      <div className="item-content">
        {item.edit === true ? (
          <div className="update-form">
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
                <textarea
                  id="category"
                  name="category"
                  onChange={(e) => handleChange(e)}
                  value={obj.category}
                ></textarea>
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
            <div className="item-pic2">
              <label htmlFor="item-pic2">
                Item picture:
                <input
                  type="file"
                  id="item-pic2"
                  name="pic"
                  onChange={(e) => handleImageUpload(e)}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="item-info">{JSON.stringify(item)}</div>
        )}
        {/*<div className="delete-update">
          <button
            className="update"
            onClick={() => {
              item.edit
                ? handleUpdateItem(item.itemName, obj)
                : handleUpdateItemEdit(item.itemName);
            }}
          >
            {item.edit ? (
              <div className="update-btn">Update </div>
            ) : (
              <div>edit</div>
            )}
          </button>
          <button
            className="delete"
            onClick={() => handleDeleteItem(item.itemName)}
          >
            Delete
          </button>
        </div>*/}
        <button onClick={() => handleUpdateItemEdit(listName, itemName)}>
          upda
        </button>
        <button onClick={() => handleUpdateitem(listName, itemName, obj)}>
          sub
        </button>
        <button onClick={() => handleDeleteItem(itemName)}>delete</button>
      </div>
    </div>
  );
}
export default Item;
