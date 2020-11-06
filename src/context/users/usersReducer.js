import {
  DELETE_USER,
  TOGGLE_IS_EDIT,
  SET_CURRENT_USER,
  UPDATE_USER,
  ADD_NEW_USER,
  UPDATE_USER_LOCATION,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.userId),
      };
    case TOGGLE_IS_EDIT:
      return {
        ...state,
        isEdit: !state.isEdit,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: state.users.filter(
          (user) => user.id === action.payload.userId
        ),
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.userId) {
            user = action.payload.newData
          } 
          return user;
        }),
      };

      case ADD_NEW_USER :
        return {
          ...state,
          users:[action.payload.newData, ...state.users]
        }

        case UPDATE_USER_LOCATION :
          return {
            ...state,
            users: state.users.map((user) => {
              if (user.id === action.payload.userId) {
                user.location = action.payload.location
              } 
              return user;
            }),
          }
  

    default:
      return state;
  }
};
