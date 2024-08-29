import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Backarrow from "./Backarrow";
import { useSelector } from "react-redux";
import AddItem from "./AddItem";
import Item from "./Item";
import {
  submitSort,
  setSearchResults,
} from "../app/usersSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

function List({ handleUpdateList, handleListResubmit, handleDeleteList }) {
  const [obj, setObj] = useState({
    listName: "",
    quantity: "",
    category: "",
    notes: "",
    share: false,
    edit: false,
  });
  const lists = useSelector((state) => state.users.currentUser?.lists) || [];

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
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  function handleSort(listID, name) {

    setSearchParams({ sort: name });
    dispatch(submitSort({listID,name}));
  }

  return (
    <div className="List">
      <div className="back-add">
        <Backarrow handleBackNavigate={handleBackNavigate} />
        <AddItem listName={currList && currList.listName} />
        <p>Sort by: <span onClick={()=> handleSort(currList.id,"default")}>Default</span><span onClick={()=> handleSort(currList.id,"name")}>Name</span><span onClick={()=> handleSort(currList.id,"category")}>Category</span></p>

      </div>

      <div className="list-items">
        <div className="list-items-info">
          <h3>{currList && currList.listName}</h3>
   
        </div>
        <div className="items">
          {currList &&
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
