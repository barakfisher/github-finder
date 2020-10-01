import React, {useContext, useState} from "react";
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search=()=> {
 const githubContext = useContext(GithubContext);
 const alertContext = useContext(AlertContext);
const {clearUsers, users} = githubContext;
const {setAlert} = alertContext;

  const [text,setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("please enter somthing", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };



    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={text}
            type="text"
            name="text"
            placeholder="Search Users..."
            onChange={onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
          {users.length > 0 && (
            <button
              className="btn btn-light btn-block"
              onClick={clearUsers}
            >
              Clear
            </button>
          )}
        </form>
      </div>
    );
}




export default Search;
