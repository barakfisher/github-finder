import React, { useContext, useEffect } from "react";
import UsersContext from "../../context/users/usersContext";
import User from "./User";
import UserModal from "./UserModal";

const Users = () => {
  const usersContext = useContext(UsersContext);
  const { users, toggleIsEdit, updateUserLocation } = usersContext;

  const style = {
    addUserContainer: {
      margin: "16px",
      width: "100%",
      padding: "16px",
      height: "190px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
     
    },
    addUserIcon: {
      fontSize: "36px",
    },
  };

  useEffect(() => {
    users.map(async (user) => {
      const address = `${user.street}, ${user.city}`;
      const location = await getGeoCode(address);
      if (location) {
        updateUserLocation(user.id, location);
      }
    });
  }, []);

  const addNewUser = () => {
    toggleIsEdit();
  };
  const getGeoCode = (address) => {
    let key = "AIzaSyBYPMBPXk17ovC_AE3fnrGihA2e4i0SCns";
    let geocodeURL =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "&key=" +
      key;
    return fetch(geocodeURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.results[0]) {
          return data.results[0].geometry.location;
        } else {
          return 0;
        }
      });
  };

  return (
    <div className="container row bg-light mt-3" style={ {margin:"unset"}}>
      <UserModal />
      {users.map((user, index) => (
        <User user={user} key={`user-${index}`} />
      ))}
      <div className="col-lg-4">
        <div style={style.addUserContainer}>
          <i
            className="fa fa-plus-circle"
            style={style.addUserIcon}
            onClick={() => {
              addNewUser();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
