import React, { useContext, useState, useEffect } from "react";
import UsersContext from "../../context/users/usersContext";
import imgSrc from '../../context/users/assests/a.jpg';

const UserModal = () => {
  const usersContext = useContext(UsersContext);
  const { isEdit, toggleIsEdit, currentUser,updateUser,setCurrentUser,users, addNewUser,updateUserLocation } = usersContext;
  const style = {
    overlay: {
      width: "100vw",
      height: "100vh",
      background: "black",
      opacity: "0.2",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: "6",
    },
    modalContainer: {
      position: "absolute",
      transform: "translate(50%, -50%)",
      top: "50%",
      right: "50%",
      zIndex: "6",
      width: "360px",
      height: "500px",
      padding: "36px",
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
    },
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


  const [formState, setFormState] = useState({
    name: "",
    city: "",
    street:  "",
    jobTitle:"",
    workAt: "",
    phone:  "",
  });

  useEffect(() => {
      if(currentUser[0]){
        setFormState({
            name: currentUser[0].name,
            city: currentUser[0].city,
            street: currentUser[0].street,
            jobTitle: currentUser[0].jobTitle,
            workAt: currentUser[0].workAt,
            phone:  currentUser[0].phone,
        })
      }
  }, [currentUser]);

const getNewUserId = () =>{
    return users.length +3;
}

  const handelSave = async () => {
    toggleIsEdit();
    const newDetails = {}
    let userId =-1;
    if(currentUser[0]){
        userId = currentUser[0].id;
        const newDetails = currentUser[0];
        newDetails.name = formState.name;
        newDetails.city= formState.city;
        newDetails.street= formState.street;
        newDetails.jobTitle = formState.jobTitle;
        newDetails.workAt= formState.workAt;
        newDetails.phone= formState.hone;
        updateUser(userId, newDetails);
    }
    else{
        userId = getNewUserId ();
        newDetails.name = formState.name ? formState.name : '' ;
        newDetails.city= formState.city ?  formState.city :'';
        newDetails.street= formState.street ? formState.street : '';
        newDetails.jobTitle = formState.jobTitle ? formState.jobTitle : '';
        newDetails.workAt= formState.workAt ? formState.workAt : '';
        newDetails.phone= formState.phone ?  formState.phone : '';
        newDetails.imgSrc= imgSrc;
        addNewUser(userId, newDetails);
    }
    const address = `${newDetails.street}, ${newDetails.city}`;
    const location = await getGeoCode(address);
    updateUserLocation(userId, location);
    
    setCurrentUser({});
    
  };
  const handelClose = () => {
    toggleIsEdit();
    setCurrentUser({})
  };

  const handelChange = (e) => {
    setFormState({
        ...formState,
      [e.target.name]: e.target.value,
    });
  };

  if (isEdit) {
    return (
      <div>
        <div style={style.overlay}></div>
        <div className="card" style={style.modalContainer}>
          <h2> Edit User</h2>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="name"
              value={formState.name}
              onChange={(e) => {
                handelChange(e);
              }}
            />
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="city"
              value={formState.city}
              onChange={(e) => {
                handelChange(e);
              }}
            />
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="street"
              placeholder="street"
              value={formState.street}
              onChange={(e) => {
                handelChange(e);
              }}
            />
          </div>

          <div class="input-group mb-3">
            <input
              type="tel"
              className="form-control"
              name="phone"
              placeholder="phone number"
              value={formState.phone}
              onChange={(e) => {
                handelChange(e);
              }}
            />
          </div>

          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="workAt"
              placeholder="Employer"
              value={formState.workAt}
              onChange={(e) => {
                handelChange(e);
              }}
            />
          </div>

          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="jobTitle"
              placeholder="jobTitle"
              value={formState.jobTitle}
              onChange={(e) => {
                handelChange(e);
              }}
            />
          </div>


          <div style={style.actions}>
            <button
              className="btn btn-success"
              onClick={() => {
                handelSave();
              }}
            >
              Save Changes
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handelClose();
              }}
            >
              Discard Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default UserModal;
