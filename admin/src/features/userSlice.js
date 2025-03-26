/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect"

const initialState = {
    users: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
        },
        createUser(state, action) {
            state.users.push(action.payload)
        },
        deleteUser(state, action) {
            state.users = state.users.filter(user => user._id !== action.payload)
        },
        updateUserStatus(state, action) {
            const user = state.users.find(user => user._id === action.payload)
            user.isRestricted = !user.isRestricted
        }
    }
})

export const { setUsers, createUser, deleteUser, updateUserStatus } = userSlice.actions

export default userSlice.reducer

export const getUsers = state => state.user.users