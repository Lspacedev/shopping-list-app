import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ListCard from "./ListCard";
import useLocalStorage from "./useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
function DisplayLists({ searchResults }) {
  const [listInfo, setListInfo] = useLocalStorage("listObj", {
    name: "",
    index: null,
  });

  const lists = useSelector((state) => state.users.currentUser.lists);

  const { list_name } = useParams();

  //navigation
  const navigation = useNavigate();

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
    navigation(`/home/lists/${listInfo.name}`);
  }, [listInfo]);

  return (
    <div className="DisplayLists">
      {list_name !== "" && typeof list_name !== "undefined" ? (
        <Outlet context={{ listArr: lists[listInfo.index] }} />
      ) : (
        <div className="lists-div">
          {
            /*searchResults.length !== 0 ? (
            searchResults.map((list, i) => (
              <div className="item" key={i}>
                <ListCard
                  list={list}
                  handleNavigateList={handleNavigateList}
                  listName={list.listName}
                  index={i}
                />
              </div>
            ))
          ) : */ lists.length > 0 ? (
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
              <div>No lists adde</div>
            )
          }
        </div>
      )}
    </div>
  );
}

export default DisplayLists;
