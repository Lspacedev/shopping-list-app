import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Backarrow from "./Backarrow";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteList,
  fetchUpdateList,
  fetchAddSharedList,
  fetchDeleteSharedList,
} from "../app/usersSlice";
import { toggleListEdit } from "../app/usersSlice";

function ListCard({ list, handleNavigateList, listName, index }) {
  const user = useSelector((state) => state.users.currentUser);
  const [obj, setObj] = useState({
    listName: "",
    quantity: "",
    category: "",
    notes: "",
    items: [],
    edit: false,
  });

  // create handleDelete function for ListCard
  const dispatch = useDispatch();

  function handleDeleteList(name) {
    dispatch(fetchDeleteList(name));
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleUpdateListEdit(name) {
    dispatch(toggleListEdit(name));
  }

  function handleUpdateList(name, obj) {
    let newListObj = {
      listName: "",
      quantity: "",
      category: "",
      notes: "",
      items: [],
      edit: false,
    };
    let [list] = user.lists.filter((list) => list.listName === name);
    //*****refactor to switch statement*****

    newListObj.listName = obj.listName === "" ? list.listName : obj.listName;
    newListObj.quantity = obj.quantity === "" ? list.quantity : obj.quantity;
    newListObj.category = obj.category === "" ? list.category : obj.category;
    newListObj.notes = obj.notes === "" ? list.notes : obj.notes;
    newListObj.items = list.items;

    // lists.edit = true;

    ////dispatch the new list to the fetchAddlist function
    dispatch(fetchUpdateList({ name: name, item: newListObj }));
  }
  function handleShareList(obj) {
    dispatch(fetchAddSharedList(obj));
  }
  function handleUnshareList(obj) {
    console.log(obj.id);
    dispatch(fetchDeleteSharedList(obj));
  }

  return (
    <div className="ListCard">
      <div className="list-content">
        {list.edit === true ? (
          <div className="update-form">
            <div className="name">
              <label htmlFor="list-name">
                List Name
                <input
                  type="text"
                  id="list-name"
                  name="listName"
                  onChange={(e) => handleChange(e)}
                  value={obj.listName}
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
          </div>
        ) : (
          <div
            className="list-info"
            onClick={() => handleNavigateList(listName, index)}
          >
            {JSON.stringify(list)}
          </div>
        )}
        <div className="delete-update">
          <button
            className="update"
            onClick={() => {
              list.edit
                ? handleUpdateList(list.listName, obj)
                : handleUpdateListEdit(list.listName);
            }}
          >
            {list.edit ? (
              <div className="update-btn">Update </div>
            ) : (
              <div>edit</div>
            )}
          </button>
          <button
            className="delete"
            onClick={() => handleDeleteList(list.listName)}
          >
            Delete
          </button>
          <button onClick={() => handleShareList(list)}>share list</button>
          <button onClick={() => handleUnshareList(list)}>unshare list</button>
        </div>
      </div>
    </div>
  );
}
export default ListCard;
