import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddList } from "../app/usersSlice";

function Form({ toggleClicked }) {
  const [obj, setObj] = useState({
    listName: "",
    quantity: "",
    category: "",
    notes: "",
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
    let name = user.name;
    let userCopy = {...user};
    const filteredList = userCopy.lists.filter(
      (list) => list.listName === obj.listName
    );
    console.log({filteredList})
    if (filteredList.length === 0) {
      console.log({userCopy})

      let newLists = [...userCopy.lists, obj];
      dispatch(fetchAddList({id: userCopy.id, lists:newLists}))
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
