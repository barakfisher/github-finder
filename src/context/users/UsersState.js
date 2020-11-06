import React, { useReducer } from "react";
import UsersContext from "./usersContext";
import UsersReducer from "./usersReducer";
import imgItem from "./assests/a.jpg";
import {
  DELETE_USER,
  TOGGLE_IS_EDIT,
  SET_CURRENT_USER,
  UPDATE_USER,
  ADD_NEW_USER,
  UPDATE_USER_LOCATION,
} from "../types";

const Userstate = (props) => {
  const initialState = {
    isEdit: false,
    currentUser: {},
    users: [
      {
        id: 1,
        name: "alex jonathan",
        imgSrc: imgItem,
        location:{lat:"",lng:""},
        jobTitle: "Developer",
        workAt: "twitter",
        street: "8 Yasur st",
        city: "Rosh Haain",
        phone: "3",
      },
      {
        id: 2,
        name: "janeth carton",
        imgSrc: imgItem,
        location:{lat:"",lng:""},
        jobTitle: "Developer",
        workAt: "twitter",
        street: "8 Yasur st",
        city: "Rosh Haain",
        phone: "3",
      },
      {
        id: 3,
        name: "alex jonathan",
        imgSrc: imgItem,
        location:{lat:"",lng:""},
        jobTitle: "Developer",
        workAt: "twitter",
        street: "8 Yasur st",
        city: "Rosh Haain",
        phone: "3",
      },
      {
        id: 4,
        name: "alex jonathan",
        imgSrc: imgItem,
        location:{lat:"",lng:""},
        jobTitle: "Developer",
        workAt: "twitter",
        street: "8 Yasur st",
        city: "Rosh Haain",
        phone: "3",
      },
      {
        id: 5,
        name: "alex jonathan",
        imgSrc: imgItem,
        location:{lat:"",lng:""},
        jobTitle: "Developer",
        workAt: "twitter",
        street: "8 Yasur st",
        city: "Rosh Haain",
        phone: "3",
      },
    ],
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

  const deleteUser = (userId) => {
    dispatch({
      type: DELETE_USER,
      payload: { userId },
    });
  };

  const toggleIsEdit = () => {
    dispatch({
      type: TOGGLE_IS_EDIT,
    });
  };

  const setCurrentUser = (userId) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: { userId },
    });
  };

  const updateUser = (userId, newData) => {
    dispatch({
      type: UPDATE_USER,
      payload: { userId, newData },
    });
  };

  const addNewUser = (userId, newData) => {
    dispatch({
      type: ADD_NEW_USER,
      payload: { userId, newData },
    });
  };

  const updateUserLocation = (userId, location) => {
    dispatch({
      type: UPDATE_USER_LOCATION,
      payload: { userId, location },
    });
  };

  return (
    <UsersContext.Provider
      value={{
        users: state.users,
        isEdit: state.isEdit,
        currentUser: state.currentUser,
        setCurrentUser,
        toggleIsEdit,
        deleteUser,
        updateUser,
        addNewUser,
        updateUserLocation,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default Userstate;
