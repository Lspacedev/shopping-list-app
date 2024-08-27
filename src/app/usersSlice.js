import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs-react";

export const fetchLoggedId = createAsyncThunk(
  "users/fetchLoggedId",
  async () => {
    const res = await fetch("http://localhost:8000/loggedUserID");
    const data = await res.json();
    return data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  }
);

export const fetchAddUser = createAsyncThunk(
  "users/fetchAddUser",
  async (obj) => {
    const salt = await bcrypt.genSalt();
    obj.password = await bcrypt.hash(obj.password, salt);
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data;
  }
);

export const fetchUpdateUser = createAsyncThunk(
  "users/fetchUpdateUser",
  async (obj, { getState }) => {
    let user = obj.user;

    let state = getState();
    let current = state.users.currentUser;

    const res = await fetch(`http://localhost:8000/users/${current.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  }
);

export const fetchDeleteUser = createAsyncThunk(
  "users/fetchDeleteUser",
  async (id) => {
    const res = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    });

    //update state
    const data = await res.json();
    return data;
  }
);

export const userLogin = createAsyncThunk(
  "users/userLogin",
  async (obj, { getState }) => {
    let state = getState();
    const findUser = state.users.usersArr.filter(
      (user) => user.name === obj.name
    );

    if (findUser.length > 0) {
      let [user] = findUser;
      let result = await bcrypt
        .compare(obj.password, user.password)
        .then((res) => {
          if (res === true) {
            return user;
          } else {
            alert("invalid login password");
          }
        });

        if(typeof result === 'object'){

          const res = await fetch("http://localhost:8000/loggedUserID", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({id:result.id}),
          });
          const data = await res.json();
          console.log(data)
          return result;
        }

    } else {
      alert("user does not exist");
    }
  }
);

/* ADD LISTS ASYNC FUNCTION */
export const fetchAddList = createAsyncThunk(
  "users/fetchAddList",
  async (obj) => {
    let id = obj.id;
    let lists = obj.lists;
    const res = await fetch(`http://localhost:8000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lists }),
    });
    const data = await res.json();
    return data;
  }
);

export const fetchUpdateList = createAsyncThunk(
  "users/fetchUpdateList",
  async (obj, { getState }) => {
    let state = getState();
    let current = state.users.currentUser;
    let copy = [...current.lists];

    let lists = copy.map((item, index) => {
      console.log(item, obj);
      if (item.listName !== obj.name) {
        // This isn't the item we care about - keep it as-is
        return item;
      }
      console.log("load");
      // Otherwise, this is the one we want - return an updated value
      return obj.item;
    });

    const res = await fetch(`http://localhost:8000/users/${current.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lists }),
    });

    const data = await res.json();
    return data;
  }
);

export const fetchDeleteList = createAsyncThunk(
  "users/fetchDeleteList",
  async (name, { getState }) => {
    let state = getState();
    let currentUser = state.users.currentUser;
    const filteredLists = currentUser.lists.filter(
      (list) => list.listName !== name
    );

    let lists = filteredLists;
    const res = await fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lists }),
    });

    const data = await res.json();
    return data;
    //;
  }
);

/* ADD ITEMS ASYNC FUNCTION */
export const fetchAddItem = createAsyncThunk(
  "users/fetchAddItem",
  async (obj, { getState }) => {
    let listName = obj.listName;
    let items = obj.items;

    let state = getState();
    let current = state.users.currentUser;
    let copy = [...current.lists];

    let lists = copy.map((item, index) => {
      console.log(item, obj);
      if (item.listName !== listName) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return { ...item, items: items };
    });

    const res = await fetch(`http://localhost:8000/users/${current.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lists }),
    });
    const data = await res.json();
    return data;
  }
);

export const fetchUpdateItem = createAsyncThunk(
  "users/fetchUpdateItem",
  async (obj, { getState }) => {
    let listName = obj.listName;
    let itemName = obj.itemName;
    let item = obj.item;

    let state = getState();
    let current = state.users.currentUser;
    let copy = [...current.lists];

    let lists = copy.map((list, index) => {
      if (list.listName !== listName) {
        return list;
      } else {
        let newItems = list.items.map((litem) => {
          console.log(litem, itemName, item);
          if (litem.itemName !== itemName) {
            return litem;
          }
          return item;
        });
        let newList = { ...list };
        newList.items = newItems;

        return newList;
      }
    });

    const res = await fetch(`http://localhost:8000/users/${current.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lists }),
    });
    const data = await res.json();
    return data;
  }
);

export const fetchDeleteItem = createAsyncThunk(
  "users/fetchDeleteItem",
  async (obj, { getState }) => {
    let listName = obj.listName;
    let items = obj.items;

    let state = getState();
    let current = state.users.currentUser;
    let copy = [...current.lists];

    let lists = copy.map((item, index) => {
      console.log(item, obj);
      if (item.listName !== listName) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return { ...item, items: items };
    });

    const res = await fetch(`http://localhost:8000/users/${current.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lists }),
    });
    const data = await res.json();
    return data;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersArr: [],
    currentUser: {},
    registrationStatus: false,
    loginStatus: false,
    loggedUserId: "",
    submittedSearch: "",
    searchResults: [],
    id: "",
    user: {},
    isLoading: false
  },
  reducers: {
    toggleListEdit: (state, action) => {
      const listIndex = state.currentUser.lists.findIndex(
        (list) => list.listName === action.payload
      );

      state.currentUser.lists[listIndex].edit = true;
    },
    toggleItemEdit: (state, action) => {
      const listIndex = state.currentUser.lists.findIndex(
        (list) => list.listName === action.payload.listName
      );

      let newItems = state.currentUser.lists[listIndex].items.map((item) => {
        if (item.itemName !== action.payload.itemName) {
          // This isn't the item we care about - keep it as-is
          return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return { ...item, edit: true };
      });
      state.currentUser.lists[listIndex].items = newItems;
    },
    userLogout: (state, action) => {
      state.loginStatus = false;
      state.registrationStatus = false;
      let id = state.currentUser.id;
      const userIndex = state.usersArr.findIndex((user) => user.id === id);

      state.usersArr.splice(userIndex, 1);
    },
    submitSearch: (state, action) => {
      state.submittedSearch = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoggedId.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchLoggedId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.id = action.payload.id;
      const userIndex = state.usersArr.findIndex(
        (user) => user.id == action.payload.id
      );

      console.log("***", userIndex, state.usersArr[userIndex])
      state.user = state.usersArr[userIndex];
      state.currentUser = state.usersArr[userIndex];

    

    });
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true;
      state.currentUser.lists = [];
    })
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.usersArr = action.payload;
    });
    /*builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })*/

    builder.addCase(fetchAddUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAddUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.usersArr.push(action.payload);
      state.registrationStatus = true;
    });
    /*builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })*/
      builder.addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true
      })

    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.id
      );

      state.usersArr[userIndex] = state.currentUser;
    });
    builder.addCase(fetchDeleteUser.fulfilled, (state, action) => {});
    
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        //let userCopy = action.payload;
        //userCopy.loginStatus = true;

        state.loginStatus = true;
        state.currentUser = action.payload;
        state.loggedUserId = action.payload.id;
      }
    });
    /*builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })*/

    builder.addCase(fetchAddList.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAddList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });

    builder.addCase(fetchDeleteList.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchDeleteList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });

    builder.addCase(fetchUpdateList.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUpdateList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });
    builder.addCase(fetchAddItem.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAddItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });

    builder.addCase(fetchUpdateItem.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUpdateItem.fulfilled, (state, action) => {
      console.log("payload for updateLIst", action.payload);
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });
    builder.addCase(fetchDeleteItem.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchDeleteItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });
  },
});
// Action creators are generated for each case reducer function
export const {
  toggleListEdit,
  toggleItemEdit,
  userLogout,
  submitSearch,
  setSearchResults,
} = usersSlice.actions;

export default usersSlice.reducer;
