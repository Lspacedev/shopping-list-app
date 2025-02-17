import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateItem, fetchDeleteItem } from "../app/usersSlice";
import { toggleItemEdit } from "../app/usersSlice";
import { IoCloseOutline } from "react-icons/io5";
function Item({ item, listName, itemName, index }) {
  const user = useSelector((state) => state.users.currentUser);

  const [obj, setObj] = useState({
    itemName: item.itemName,
    quantity: item.quantity,
    category: item.category,
    notes: item.notes,
    itemPic: "",
    items: [],
    edit: false,
  });

  // create handleDelete function for itemCard
  const dispatch = useDispatch();

  function handleDeleteItem(name) {
    let deleteConfirmation = window.confirm(
      "Are you sure you want to delete item?"
    );
    if (deleteConfirmation) {
      let userCopy = { ...user };
      //get list
      const [filteredList] = userCopy.lists.filter(
        (list) => list.listName === listName
      );
      const filteredItems = filteredList.items.filter(
        (item) => item.itemName !== name
      );

      dispatch(
        fetchDeleteItem({
          listName: filteredList.listName,
          items: filteredItems,
        })
      );
      alert("Item has been deleted");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleUpdateItemEdit(list, item) {
    dispatch(toggleItemEdit({ listName: list, itemName: item }));
  }

  function handleUpdateitem(name, itemN, obj) {
    if (obj) {
      let updateConfirmation = window.confirm(
        "You are about to update item information. Continue?"
      );
      if (updateConfirmation) {
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
        const [item] = filteredList.items.filter(
          (item) => item.itemName === itemN
        );

        //*****refactor to switch statement*****

        newItemObj.itemName =
          obj.itemName === "" ? item.itemName : obj.itemName;
        newItemObj.quantity =
          obj.quantity === "" ? item.quantity : obj.quantity;
        newItemObj.category =
          obj.category === "" ? item.category : obj.category;
        newItemObj.notes = obj.notes === "" ? item.notes : obj.notes;
        newItemObj.itemPic = obj.itemPic === "" ? item.itemPic : obj.itemPic;
        newItemObj.date = item.date;

        // items.edit = true;
        if (
          !obj.itemName &&
          !obj.quantity &&
          !obj.category &&
          !obj.notes &&
          !obj.itemPic
        ) {
          alert("Error! No update information was entered!");
        } else {
          alert("Item has been updated");
        }
        ////dispatch the new item to the fetchAdditem function
        dispatch(
          fetchUpdateItem({ listName: name, itemName: itemN, item: newItemObj })
        );
      }
    }
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
  function getItemPic(obj) {
    if (obj.itemPic === "") {
      return "/images/bag.png";
    } else {
      return obj.itemPic;
    }
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
                  maxLength="15"
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
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  onChange={(e) => handleChange(e)}
                  value={obj.quantity}
                />
              </label>
            </div>

            <div className="category">
              <label htmlFor="category">
                Category
                <input
                  type="text"
                  id="category"
                  name="category"
                  maxLength="15"
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
                  maxLength="25"
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
            <button
              className="close"
              onClick={() => handleUpdateItemEdit(listName, itemName)}
            >
              <IoCloseOutline />
            </button>
          </div>
        ) : (
          <div className="item-info">
            <div className="icon">
              <img src={getItemPic(item)} alt="icon" />
            </div>
            <div className="col">
              <h6>Item name</h6>
              {item.itemName}
            </div>
            <div className="col">
              <h6>Quantity</h6>
              {item.quantity}
            </div>
            <div className="col">
              <h6>Category</h6>
              {item.category}
            </div>
            <div className="notes col">
              <h6>Notes</h6>
              <div>{item.notes}</div>
            </div>
            <div className="item-date col">
              <h6>Date</h6>
              <div>{item.date}</div>
            </div>
          </div>
        )}
        <div className="delete-update">
          <button
            className="update"
            onClick={() => {
              {
                item.edit === false
                  ? handleUpdateItemEdit(listName, itemName)
                  : handleUpdateitem(listName, itemName, obj);
              }
            }}
          >
            {item.edit ? (
              <div className="update-btn">Update </div>
            ) : (
              <div>edit</div>
            )}
          </button>
          <button className="delete" onClick={() => handleDeleteItem(itemName)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default Item;
