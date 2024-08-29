import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddList } from "../app/usersSlice";

function Form({ toggleClicked }) {
  const getLists = useSelector((state) => state.users.currentUser?.lists) || [];

  const [obj, setObj] = useState({
    id: (getLists.length + 1).toString(),
    listName: "",
    quantity: "",
    category: "",
    notes: "",
    items: [],
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

    //check if list exists in the users lists array
    let userCopy = { ...user };
    const filteredList = userCopy.lists.filter(
      (list) => list.listName === obj.listName
    );

    //if list is not found, add the list to the users lists
    if (filteredList.length === 0) {
      if (obj.listName === "") {
        alert("Please enter a list name.");
      } else {
        let newLists = [...userCopy.lists, obj];

        //dispatch the new list to the fetchAddlist function
        dispatch(fetchAddList({ id: userCopy.id, lists: newLists }));

        //alert success
        alert("List has been succesfully added.");
      }
    }
    toggleClicked();
  }

  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="Form">
      <div className="form-div">
        <div className="form-title-close">
          <h3>Enter List Information</h3>
          <div className="form-close" onClick={handleFormClose}>
            x
          </div>
        </div>
        <form>
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

export default Form;
