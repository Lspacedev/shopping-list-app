import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Backarrow from "./Backarrow";
import { useSelector } from "react-redux";


function List({
  handleUpdateList,
  handleListResubmit,
  handleDeleteList,
}) {
  const [obj, setObj] = useState({
    listName: "",
    quantity: "",
    category: "",
    notes: "",
    edit: false,
  });
  const lists = useSelector((state) => state.users.currentUser.lists);

  const { listArr } = useOutletContext();
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }
  //navigation
  const navigation = useNavigate();
  function handleUpdateSubmit() {
    handleListResubmit(listArr.listName, obj);
    navigation(`/home/lists/${obj.listName}`);
  }
  function handleBackNavigate() {
    navigation(`/home/lists/`);
  }
  function handleDeleSubmit() {
    handleDeleteList(listArr && listArr.listName);
    navigation("/home/lists");
  }

 
  let currList;
  let edit;
  if (listArr) {
    const [curr] = lists.filter(
      (list) => list.listName === listArr.listName
    );

    currList = curr;
    edit = currList.edit;
  }

  console.log("Lists in List.js", lists, currList);
  return (
    <div className="List">
      <Backarrow handleBackNavigate={handleBackNavigate} />
      <div className="list-content">
        {edit === true ? (
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
          <div className="list-info">
            <h1>{currList && currList.listName}</h1>
            <div className="category-text">
              <p>{currList && currList.category}</p>
            </div>
      
          </div>
        )}
        {/*<div className="delete-update">
          <button
            className="update"
            onClick={() => {
              edit
                ? handleUpdateSubmit()
                : handleUpdateList(listArr && listArr.listName);
            }}
          >
            {edit ? <div className="update-btn">Update </div> : <div>edit</div>}
          </button>

          <button className="delete" onClick={() => handleDeleSubmit()}>
            Delete
          </button>
        </div>*/}
      </div>
    </div>
  );
}
export default List;
