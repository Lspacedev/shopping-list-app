import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs-react";
import { act } from "react";

export const fetchLoggedId = createAsyncThunk(
  "users/fetchLoggedId",
  async () => {
    const res = await fetch("http://localhost:8000/loggedUserID/0");
    const data = await res.json();
    return data;
  }
);

export const fetchResetLoggedId = createAsyncThunk(
  "users/fetchResetLoggedId",
  async () => {
    const res = await fetch("http://localhost:8000/loggedUserID/0", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: "0" }),
    });
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

export const fetchSharedLists = createAsyncThunk(
  "users/fetchSharedLists",
  async () => {
    const res = await fetch("http://localhost:8000/sharedLists");
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
    //const data = await res.json();
    return id;
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

      if (typeof result === "object") {
        let id = result.id;
        const res = await fetch("http://localhost:8000/loggedUserID/0", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: id }),
        });
        const data = await res.json();

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
      if (item.listName !== obj.name) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

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

/* SHARED LISTS */

export const fetchAddSharedList = createAsyncThunk(
  "users/fetchAddSharedList",
  async (obj) => {
    const res = await fetch("http://localhost:8000/sharedLists", {
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

export const fetchDeleteSharedList = createAsyncThunk(
  "users/fetchDeleteSharedList",
  async (obj, { getState }) => {
    let id = obj.id;
    const res = fetch(`http://localhost:8000/sharedLists/${id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    });

    return id;
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
    submittedSearch: {},
    submittedSort: {},

    searchResults: [],
    id: "",
    user: {},
    isLoading: false,
    sharedLists: [],
  },
  reducers: {
    getLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
    toggleListEdit: (state, action) => {
      const listIndex = state.currentUser.lists.findIndex(
        (list) => list.listName === action.payload
      );

      state.currentUser.lists[listIndex].edit =
        !state.currentUser.lists[listIndex].edit;
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
        return { ...item, edit: !item.edit };
      });
      state.currentUser.lists[listIndex].items = newItems;
    },
    toggleShareTrue: (state, action) => {
      const listIndex = state.currentUser.lists.findIndex(
        (list) => list.listName === action.payload
      );

      state.currentUser.lists[listIndex].share = true;
    },
    toggleShareFalse: (state, action) => {
      const listIndex = state.currentUser.lists.findIndex(
        (list) => list.listName === action.payload
      );

      state.currentUser.lists[listIndex].share = false;
    },
    userLogout: (state, action) => {
      state.loggedUserId = "";
      state.loginStatus = false;
      state.registrationStatus = false;
      // let id = state.currentUser.id;
      //const userIndex = state.usersArr.findIndex((user) => user.id === id);

      //state.usersArr.splice(userIndex, 1);
    },
    submitSearch: (state, action) => {
      state.submittedSearch = {
        ...state.submittedSearch,
        term: action.payload,
      };
    },
    submitSort: (state, action) => {
      const listIndex = state.currentUser.lists.findIndex(
        (list) => list.id == action.payload.listID
      );
      let items = [...state.currentUser.lists[listIndex].items];

      if (action.payload.name === "name") {
        items.sort((a, b) => (a.itemName > b.itemName ? 1 : -1));
      } else if (action.payload.name === "category") {
        items.sort((a, b) => (a.category > b.category ? 1 : -1));
      } else if (action.payload.name === "default") {
        items.sort((a, b) => (a.itemName > b.itemName ? 1 : -1));
      } else if (action.payload.name === "date") {
        items.sort((a, b) => (a.date > b.date ? 1 : -1));
      }
      state.currentUser.lists[listIndex].items = items;
      // state.submittedSort = { ...state.submittedSort, term: action.payload };
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoggedId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLoggedId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.id = action.payload.userId;

      const userIndex = state.usersArr.findIndex(
        (user) => user.id == action.payload.userId
      );

      state.user = state.usersArr[userIndex];
      state.currentUser = state.usersArr[userIndex];
    });
    builder.addCase(fetchResetLoggedId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchResetLoggedId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.id = action.payload.userId;
    });
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true;
      state.currentUser.lists = [];
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersArr = action.payload;
    });
    /*builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })*/

    builder.addCase(fetchAddUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersArr.push(action.payload);
      state.registrationStatus = true;
    });
    /*builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })*/
    builder.addCase(fetchUpdateUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.id
      );

      state.usersArr[userIndex] = state.currentUser;
    });
    builder.addCase(fetchDeleteUser.fulfilled, (state, action) => {
      //let id = state.currentUser.id;

      const userIndex = state.usersArr.findIndex(
        (user) => user.id == action.payload
      );

      state.usersArr.splice(userIndex, 1);

      //state.currentUser = {};
      //state.user = {};
      // state.loggedUserId = "";
      //state.loginStatus = false;
      // state.registrationStatus = false;
    });

    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        //let userCopy = action.payload;
        //userCopy.loginStatus = true;

        state.loginStatus = true;
        state.currentUser = action.payload;
        state.user = action.payload;
        state.loggedUserId = action.payload.id;
      }
    });
    /*builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })*/

    builder.addCase(fetchAddList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });

    builder.addCase(fetchDeleteList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeleteList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });

    builder.addCase(fetchUpdateList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUpdateList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });
    builder.addCase(fetchAddItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });

    builder.addCase(fetchUpdateItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUpdateItem.fulfilled, (state, action) => {
      state.isLoading = false;

      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });
    builder.addCase(fetchDeleteItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeleteItem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload };
      const userIndex = state.usersArr.findIndex(
        (user) => user.name === action.payload.name
      );

      state.usersArr[userIndex].lists = [...action.payload.lists];
    });
    builder.addCase(fetchAddSharedList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddSharedList.fulfilled, (state, action) => {
      //state.isLoading = false;
      state.isLoading = false;
      state.sharedLists.push(action.payload);
    });
    builder.addCase(fetchSharedLists.pending, (state) => {
      state.isLoading = true;
      //state.currentUser.lists = [];
    });
    builder.addCase(fetchSharedLists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sharedLists = action.payload;
    });
    builder.addCase(fetchDeleteSharedList.fulfilled, (state, action) => {
      let sharedLists = [...state.sharedLists];
      state.sharedLists = sharedLists.filter(
        (list) => list.id != action.payload
      );
    });
  },
});
// Action creators are generated for each case reducer function
export const {
  getLoginStatus,
  toggleListEdit,
  toggleItemEdit,
  userLogout,
  submitSearch,
  submitSort,
  setSearchResults,
  toggleShareTrue,
  toggleShareFalse,
} = usersSlice.actions;

export default usersSlice.reducer;
