import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Backarrow from "./Backarrow";
import { useSelector } from "react-redux";
import AddItem from "./AddItem";
import Item from "./Item";

function List({ handleUpdateList, handleListResubmit, handleDeleteList }) {
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
    const [curr] = lists.filter((list) => list.listName === listArr.listName);

    currList = curr;
    edit = currList.edit;
  }

  console.log("Lists in List.js", lists, currList);
  return (
    <div className="List">
      <Backarrow handleBackNavigate={handleBackNavigate} />
      <AddItem listName={currList.listName} />

      <div className="list-content">
        <div className="list-info">
          <h1>{currList && currList.listName}</h1>
          <div className="category-text">
            <p>{currList && currList.category}</p>
          </div>
        </div>
        <div className="items">
          {currList.items &&
            currList.items.map((item, i) => (
              <Item
                key={i}
                item={item}
                listName={currList.listName}
                itemName={item.itemName}
                index={i}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default List;
