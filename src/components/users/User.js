import React, { useContext } from "react";
import UsersContext from "../../context/users/usersContext";

const User = (props) => {
  const usersContext = useContext(UsersContext);
  const { deleteUser, toggleIsEdit, setCurrentUser } = usersContext;

  const { user } = props;

  const style = {
    userCard: {
      margin: "16px 0",
      width: "100%",
      height:"190px",
      padding: "16px",
    },
    imageStyle: {
      width: "100%",
      height: "130px",
      border: "1px solid black",
    },
    actionsContainer: {
      position: "absolute",
      bottom: "0",
      right: "0",
      padding: "8px",
    },
  };

  const handelDelete = (userId) => {
    deleteUser(userId);
  };
  const handelEdit = (userId) => {
    setCurrentUser(userId);
    toggleIsEdit();
  };

  const { name, imgSrc, jobTitle, id, location} = user;
  
  return (
    <div className="col-lg-4">
      <div className="card " style={style.userCard}>
        <div className="row" style={{flexWrap:"nowrap"}}>
          <div className="image-container col-sm-5">
            <img className="rounded-circle" src={imgSrc} alt="img" />
            <div> {jobTitle}</div>
          </div>
          <div className="details col-sm-7">
            <b>{name}</b>
            <div>Lat: {location.lat} Lng:{location.lng} </div>
          </div>
          <div style={style.actionsContainer}>
            <i
              className="fa fa-pencil mx-1"
              onClick={() => {
                handelEdit(id);
              }}
            >
              {" "}
            </i>
            <i
              className="fa fa-trash mx-1"
              onClick={() => {
                handelDelete(id);
              }}
            >
              {" "}
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
