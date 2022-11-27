import {createSlice} from '@reduxjs/toolkit'
const authSlice = createSlice({
    name:'auth',
    initialState:{
        login:{
        currentUser:null,
        isFetching:false,
        isError:false,
        currentUserError:null
        },
        register:{
            isFetching:false,
            isError:false,
            isSuccess:false
        }
    },
    reducers:{
        loginStart:(state)=>{
            state.login.isFetching=true
        },
        loginSuccess:(state,action)=>{
            state.login.isFetching=false
            state.login.currentUser=action.payload
            state.login.isError=false
            state.login.currentUserError=null
        },
        loginError:(state,action)=>{
            state.login.isFetching=false
            state.login.isError=true
            state.login.currentUserError=action.payload
        },
        registerStart:(state)=>{
            state.register.isFetching=true
        },
        registerSuccess:(state)=>{
            state.register.isFetching=false
            state.register.isError=false
            state.register.isSuccess=true
        },
        registerError:(state)=>{
            state.register.isFetching=false
            state.register.isError=true
            state.register.isSuccess=false
        }

    }
})
export const {loginStart,loginSuccess,loginError,registerStart,registerSuccess,registerError} = authSlice.actions
export default authSlice.reducer