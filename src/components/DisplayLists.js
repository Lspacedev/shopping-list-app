import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ListCard from "./ListCard";
import useLocalStorage from "./useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import { setSearchResults } from "../app/usersSlice";
function DisplayLists() {
  const [listInfo, setListInfo] = useLocalStorage("listObj", {
    name: "",
    index: null,
  });
  const [notFound, setNotFound] = useState(false);
  const isLoading = useSelector((state) => state.users.isLoading);
  const getLists = useSelector((state) => state.users.currentUser?.lists) || [];
  const lists = isLoading === true ? [] : getLists;

  const searchResults = useSelector((state) => state.users.searchResults);
  const submittedSearch =
    useSelector((state) => state.users.submittedSearch?.term) || "";
  const { list_name } = useParams();

  const user = useSelector((state) => state.users.user);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (submittedSearch && submittedSearch.length === 0) {
      dispatch(setSearchResults([]));
    }
    if (
      submittedSearch &&
      submittedSearch.length > 0 &&
      searchResults &&
      searchResults.length === 0
    ) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [submittedSearch, searchResults]);

  //function to store clicked listcard information to use in navigating to list subpage
  function handleNavigateList(name, index) {
    setListInfo({ name, index });
  }

  //useeffect to listen for click away from current list subpage
  useEffect(() => {
    //check if click away true, list_name params undefined, if true clear local storage infoObj to avoid redirect to list subpage
    if (typeof list_name === "undefined") {
      localStorage.removeItem("listObj");
    } else {
      //in the case of change / update of list name, update the listInfo Object, which will update the navigation url with new name in the second useeffect
      setListInfo((prev) => ({ ...prev, name: list_name }));
    }
  }, [list_name]);

  //useeffect to listen to changes in listInfo, clicked listcard info, and navigate to clicked card subpage
  useEffect(() => {
    if (listInfo.name !== "") {
      navigation(`/home/lists/${listInfo.name}`);
    }
  }, [listInfo]);

  function getItemPic(obj) {
    if (obj.itemPic === "") {
      return "/images/bag.png";
    } else {
      return obj.itemPic;
    }
  }

  return (
    <div className="DisplayLists">
      {isLoading === true ? (
        <div>Loading... </div>
      ) : (
        <div>
          {list_name !== "" && typeof list_name !== "undefined" ? (
            typeof lists !== "undefined" && (
              <Outlet context={{ listArr: lists[listInfo.index] }} />
            )
          ) : (
            <div className="lists-div">
              {searchResults && searchResults.length !== 0 ? (
                searchResults.map((item, i) => (
                  <div className="item" key={i}>
                    <div className="item-info">
                      <div>
                        <img src={getItemPic(item)} alt="icon" />
                      </div>
                      <div>
                        <h6>Item name</h6>
                        {item.itemName}
                      </div>
                      <div>
                        <h6>Quantity</h6>
                        {item.quantity}
                      </div>
                      <div>
                        <h6>Category</h6>
                        {item.category}
                      </div>
                      <div>
                        <h6>Notes</h6>
                        {item.notes}
                      </div>
                    </div>
                  </div>
                ))
              ) : searchResults.length === 0 && notFound === true ? (
                <div style={{ margin: "auto" }}>No results</div>
              ) : typeof lists !== "undefined" && lists.length > 0 ? (
                lists.map((list, i) => (
                  <div className="item" key={i}>
                    <ListCard
                      key={i}
                      list={list}
                      handleNavigateList={handleNavigateList}
                      listName={list.listName}
                      index={i}
                    />
                  </div>
                ))
              ) : (
                <div className="no-lists">No lists added</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DisplayLists;
