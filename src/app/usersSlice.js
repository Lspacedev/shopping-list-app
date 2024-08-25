import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import bcrypt from "bcryptjs-react";

export const fetchAddList = createAsyncThunk(
  'users/fetchAddList',
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

  
  
 
 
)
  
  


export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async () => {
      const res = await fetch('http://localhost:8000/users')
      const data = await res.json();
      return data
    }
  )


export const fetchAddUser = createAsyncThunk(
  'users/fetchAddUser',
  async (obj) => {
    const salt = await bcrypt.genSalt();
    obj.password = await bcrypt.hash(obj.password, salt);
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj)
    });
    const data = await res.json();
    return data;
  }
)
export const userLogin = createAsyncThunk(
  'users/userLogin',
  async (obj, {getState}) => {
    console.log("login", obj)
    let state = getState();
    console.log("im state", state)
    const findUser = state.users.usersArr.filter((user) => user.name === obj.name);
    console.log("im state", state, "FOnd",findUser)

    if (findUser.length > 0) {
      let [user] = findUser;
      let result = bcrypt.compare(obj.password, user.password).then((res) => {
        if (res === true) {
          console.log("tis true",user)
          return user;
        
        } else {
          alert("invalid login password");
        }
      });
      return result;
    } else {
      alert("user does not exist");
    }
  }
)




export const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersArr: [],
    currentUser: {},
    registrationStatus: false,
    loginStatus: false

  },
  reducers: {

  },
  extraReducers: (builder) => {
    /*builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true
    })*/
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      //state.isLoading = false
      state.usersArr = action.payload
    })
    /*builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })*/

    /*builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true
    })*/
    builder.addCase(fetchAddUser.fulfilled, (state, action) => {
      //state.isLoading = false
     state.usersArr.push(action.payload)
     state.registrationStatus = true;
    })
    /*builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })*/

          /*builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true
    })*/
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log("payload",action.payload)
      if(action.payload){
        state.loginStatus = true;
        state.currentUser = action.payload;
      }
    })
    /*builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })*/

                /*builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true
    })*/
    builder.addCase(fetchAddList.fulfilled, (state, action) => {
      console.log("payload for addLIst", action.payload)
      state.currentUser = {...action.payload};
      const userIndex=state.usersArr.findIndex((user)=> user.name === action.payload.name);

     state.usersArr[userIndex].lists = [...action.payload.lists];
    })
    /*builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })*/
  },
});
// Action creators are generated for each case reducer function
//export const { userLogin } = usersSlice.actions;

export default usersSlice.reducer;